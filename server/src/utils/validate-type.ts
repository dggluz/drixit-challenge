import { _Promise } from 'error-typed-promise';
import { TypeValidationError } from '../errors/type-validation-error';
import { _promisify } from './_promisify';

export const validateType = <T> (validation: (x: unknown) => T) =>
    (x: unknown) =>
        _promisify(() => validation(x))
        .catch(err => _Promise.reject(new TypeValidationError(err)))
;
