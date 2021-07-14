import { makeLit } from '../utils/make-lit';

export type HttpErrors = BadRequestError;

abstract class HttpError extends Error {
    abstract statusCode: number;

    errorCode?: string;

    constructor (e: unknown, errorCode?: string) {
        super(`${e}`);
        this.errorCode = errorCode;
    }
    
}

export class BadRequestError extends HttpError {
    __brand = makeLit('BadRequestError');
    statusCode = 400;
}
