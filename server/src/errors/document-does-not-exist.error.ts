import { Filter } from 'mongodb';
import { makeLit } from '../utils/make-lit';

export class DocumentDoesNotExistError extends Error {
    __brand = makeLit('DocumentDoesNotExistError');

    constructor (criteria: Filter<any>, collectionName: string) {
        super(`There is no document on collection ${collectionName} matching the criteria ${criteria}`);
    }
}
