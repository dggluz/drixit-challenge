import { makeLit } from '../utils/make-lit';

export class InvalidDocumentError extends Error {
    __brand = makeLit('InvalidDocument');

    constructor (err: Error, collectionName: string) {
        super(`Invalid schema for document of collection ${collectionName}: ${err.message}`);
    }
}
