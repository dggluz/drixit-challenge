import { isError } from './is-error';
import { makeLit } from '../utils/make-lit';

export class TypeValidationError extends Error {
    __brand = makeLit('TypeValidationError');

    constructor(originalError: unknown) {
        super(isError(originalError) ? originalError.message : `${originalError}`);

        if (isError(originalError)) {
            this.stack = originalError.stack;
        }
    }
}
