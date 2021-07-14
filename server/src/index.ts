import { _Promise } from 'error-typed-promise';
import { verify } from 'jsonwebtoken';
import { createServer, Next, Request, Response, plugins } from 'restify';
import corsMiddleware from 'restify-cors-middleware2';
import { JWT_PRIVATE_KEY } from './config/jwt-private-key';
import { authenticateController } from './controllers/authenticate-controller';
import { pingController } from './controllers/ping';
import { objOf } from './type-validation/obj-of';
import { str } from './type-validation/str';
import { users } from './users';

const omit = <T extends Record<PropertyKey, any>> (ommitedKey: keyof T, obj: T) => {
    const { [ommitedKey]: ommited, ...ret} = obj;
    return ret;
};

const getUserInfo = (req: Request, res: Response, next: Next) => {
    const authHeader = req.header('Authorization', '');
    const bearer = authHeader.slice(0, 7);
    const token = authHeader.slice(7);

    if (bearer !== 'Bearer ') {
        res.json(401, {
            errorCode: 'NOT_AUTHENTICATED',
            status: 'ERROR'
        });
        return next();
    }

    verify(token, JWT_PRIVATE_KEY, (err, payload) => {
        if (err) {
            res.json(401, {
                errorCode: 'INVALID_JWT',
                status: 'ERROR'
            });
            return next();
        }

        // TODO: send error if fails
        const data = objOf({
            email: str
        })(payload);

        const user = users.find(({ email }) => email === data.email);

        if (!user) {
            res.send(404, {
                errorCode: 'INEXISTENT_USER',
                status: 'ERROR'
            })
            return next();
        }

        res.send(omit('password', user));
        next();
    });
};

// Init server

const server = createServer();

const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['Authorization'],
    allowCredentialsAllOrigins: true,
});

server.pre(cors.preflight) 
server.use(cors.actual)

server.use(plugins.bodyParser());


server.get('/ping', pingController);

server.post('/api/v0/authenticate', authenticateController);

server.get('/api/v0/users/me', getUserInfo);

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});