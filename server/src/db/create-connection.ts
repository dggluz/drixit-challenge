import { _Promise } from 'error-typed-promise';
import { MongoClient } from 'mongodb';
import { MongoError } from '../errors/mongo.error';

export const createMongoConnection = (url: string) =>
    new _Promise<MongoClient, MongoError>((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
                if (err) {
                    reject(new MongoError(err));
                }
                else if (client ){
                    resolve(client);
                }
                else {
                    throw new Error('Expected to never happen. Error creating a mongo connection');
                }
            }
        );
    })
;
