import { makeLit } from '../utils/make-lit';

export class InexistentUserError extends Error {
    __brand = makeLit('InexistentUserError');

    constructor (email: string) {
        super(`There is no user with email "${ email }"`);
    }
}
