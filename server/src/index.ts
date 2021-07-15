import { _Promise } from 'error-typed-promise';
import { resolve } from 'path';
import { createServer, plugins } from 'restify';
import corsMiddleware from 'restify-cors-middleware2';
import { authenticateController } from './controllers/authenticate.controller';
import { getUserInfo } from './controllers/get-user-info.controller';
import { pingController } from './controllers/ping.controller';

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


server.get('/', function (_req, res, next) {
    res.redirect('./public/', next);
});

// Setting up API routes
server.get('/ping', pingController);

server.post('/api/v0/authenticate', authenticateController);

server.get('/api/v0/users/me', getUserInfo);

// Setting up static server
server.get(`/public/*`, plugins.serveStatic({
    directory: resolve(process.cwd(), `./public/../`),
    default: 'index.html'
}));

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});