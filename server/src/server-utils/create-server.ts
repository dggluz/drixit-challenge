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


    // Setting up static server
    ['/', '/login', '/get-user-info', '/user-info'].forEach(indexPath => {
        server.get(indexPath, plugins.serveStatic({
            directory: resolve(process.cwd(), `./public/`),
            file: 'index.html',
            charSet: 'utf-8'
        }));
    });

    server.get('/build/js/bundle.js', plugins.serveStatic({
        directory: resolve(process.cwd(), `./public/build/js/`),
        file: 'bundle.js',
        charSet: 'utf-8'
    }));

    return server;
};