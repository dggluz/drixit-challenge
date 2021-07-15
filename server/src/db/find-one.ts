import { _Promise } from 'error-typed-promise';
import { Collection, Document, Filter, MongoClient } from 'mongodb';
import { getConfigs } from '../config/get-configs';
import { DocumentDoesNotExistError } from '../errors/document-does-not-exist.error';
import { MongoError } from '../errors/mongo.error';
import { isNotDefined } from '../type-validation/undef';
import { rejectIf } from '../utils/reject-if';
import { connect } from './connect';

const mongoFindOne = <T = unknown> (criteria: Filter<T>) =>
	(collection: Collection<any>) =>
		new _Promise<Document | undefined, MongoError>((resolve, reject) => {
			collection.findOne(criteria, (err, result) => {
				if (err) {
					reject(new MongoError(err));
				}
				else {
                    resolve(result);
				}
			});
		})
;

export const findOneDocument = <T> (collectionName: string, criteria: Filter<T>) =>
    connect()
        .then(db => db.collection(collectionName))
        .then(mongoFindOne(criteria))
        .then(rejectIf(
            isNotDefined,
            () => new DocumentDoesNotExistError(criteria, collectionName)
        ))
        .then(x => x as unknown)
;
