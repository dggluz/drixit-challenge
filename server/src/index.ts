import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import { resolve } from 'path';
import { createServer, Next, Request, Response, plugins } from 'restify';
import corsMiddleware from 'restify-cors-middleware2';
import { objOf } from './type-validation/obj-of';
import { str } from './type-validation/str';
import { users } from './users';

// TODO: get the secrets path from secrets when dockerizing.
const JWT_PRIVATE_KEY = readFileSync(resolve(__dirname, str('../../JWT_PRIVATE_KEY')), 'utf-8');

const ping = (req: Request, res: Response, next: Next) => {
    console.log('Ping');
    res.send('pong');
    next();
};

const lookupUser = (email: string, password: string) =>
    users.find(user =>
        user.email === email && user.password === password
    )
;

const authenticate = (req: Request, res: Response, next: Next) => {
    console.log('Authenticate');
    
    const body = objOf({
        email: str,
        password: str
    }) (req.body);
    
    console.log(body);

    const user = lookupUser(body.email, body.password);

    if (!user) {
        res.json(400, {
            errorCode: 'INVALID_USER_AUTH',
            status: 'ERROR'
        });
        return next();
    }

    // Generate JWT
    const jwt = sign({
        email: user.email
    }, JWT_PRIVATE_KEY);

    res.json({ jwt });
    next();
};

const getUserInfo = (req: Request, res: Response, next: Next) => {
    res.json(users[0]);
    next();
};

const server = createServer();

const cors = corsMiddleware({
    preflightMaxAge: 5,
    // TODO: change when serving from docker
    origins: ['*'],
    // origins: ['http://api.myapp.com', 'http://web.myapp.com'],
    // allowHeaders: ['API-Token'],
    // exposeHeaders: ['API-Token-Expiry'],
    allowCredentialsAllOrigins: true
});

server.pre(cors.preflight) 
server.use(cors.actual)

server.use(plugins.bodyParser());

server.get('/ping', ping);

server.post('/api/v0/authenticate', authenticate);

server.get('/api/v0/users/me', getUserInfo);

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});