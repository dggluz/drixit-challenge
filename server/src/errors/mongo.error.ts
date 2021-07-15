import { makeLit } from '../utils/make-lit';

export class MongoError extends Error {
    __brand = makeLit('MongoError');
    originalError: Error;

    constructor (err: Error) {
        super(err.message);

        this.originalError = err;
    }
}
