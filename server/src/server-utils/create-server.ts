import { resolve } from 'path';
import { createServer as _createServer, plugins } from 'restify';
import corsMiddleware from 'restify-cors-middleware2';

export const createServer = () => {
    const server = _createServer();

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

    // Setting up static server
    server.get(`/public/*`, plugins.serveStatic({
        directory: resolve(process.cwd(), `./public/../`),
        default: 'index.html'
    }));

    return server;
};