import { getConfig } from './config/get-config';
import { authenticateController } from './controllers/authenticate.controller';
import { getUserInfo } from './controllers/get-user-info.controller';
import { pingController } from './controllers/ping.controller';
import { createServer } from './server-utils/create-server';

// Init server

const server = createServer();

// Setting up API routes
server.get('/ping', pingController);

server.post('/api/v0/authenticate', authenticateController);

server.get('/api/v0/users/me', getUserInfo);

getConfig('SERVER_PORT')
    .then(port => {
        server.listen(port, () => {
            console.log('%s listening at %s', server.name, server.url);
        });
    })
    .catch(err => {
        console.error('Can not start server', err);
        process.exit(1);
    })
;
