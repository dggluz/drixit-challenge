import { makeLit } from '../utils/make-lit';

export class UnavailableSecretError extends Error {
    __brand = makeLit('UnavailableSecretError');

    previousError: Error;

    constructor (secretName: string, err: Error) {
        super(`Not able to read secret "${ secretName }"`);
        this.previousError = err;
    }
}
