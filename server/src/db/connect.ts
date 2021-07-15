import { getConfigs } from '../config/get-configs';
import { createMongoConnection } from './create-connection';

const forceConnect = () =>
    getConfigs({
        host: 'DB_HOST',
        port: 'DB_PORT',
        dbName: 'DB_NAME'
    })
    .then(({ host, port, dbName}) =>
        createMongoConnection(`mongodb://${host}:${port}`)
            .then(client => client.db(dbName))
    )
;

let cnx: ReturnType<typeof forceConnect> | undefined;

export const connect = () => {
    if (!cnx) {
        cnx = forceConnect();
    }
    return cnx;
};
