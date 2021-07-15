import { _Promise } from 'error-typed-promise';
import { _promisify } from './_promisify';
import { makeLit } from '../utils/make-lit';

export const validateType = <T> (validation: (x: unknown) => T) =>
    (x: unknown) =>
        _promisify(() => validation(x))
        .catch(err => _Promise.reject(new TypeValidationError(err)))
;

export class TypeValidationError extends Error {
    __brand = makeLit('TypeValidationError');

    constructor(originalError: any) {
        super(originalError.hasOwnProperty('message') ? originalError.message : `${originalError}`);
    }
}
