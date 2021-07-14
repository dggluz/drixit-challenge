import { makeLit } from '../utils/make-lit';

export class InvalidUserPasswordError extends Error {
    __brand = makeLit('InvalidUserPasswordError');

    constructor (email: string, password: string) {
        super(`The email "${ email }" and password "${ password } combination is invalid`);
    }
}
