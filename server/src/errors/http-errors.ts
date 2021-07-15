import { makeLit } from '../utils/make-lit';
import { isError } from './is-error';

export type HttpErrors = BadRequestError | UnauthorizedError | NotFoundError | UnprocessableEntityError;

export const isHttpError: (x: unknown) => x is HttpErrors = (x: any): x is HttpErrors =>
    x.hasOwnProperty('__HttpError') && x.__HttpError === 'HttpError'
;

abstract class HttpError extends Error {
    protected abstract statusCode: number;
    protected _originalError?: Error;

    __HttpError = makeLit('HttpError');

    constructor (e: unknown, private errorCode?: string) {
        super(isError (e) ? e.message : `${e}`);

        if (isError(e)) {
            this._originalError = e;
        }
    }
    
    getLoggingInfo () {
        return `HttpError ${ this.getStatusCode() } / ${ this.getErrorCode() } \n    ${ this.getStack()}`;
    }

    getStatusCode () {
        return this.statusCode;
    }

    getErrorCode () {
        return this.errorCode || 'UNKNOWN_ERROR';
    }

    getStack () {
        return this._originalError ?
            `${ this._originalError.stack } \n ... \n ${ this.stack }` :
            this.stack
        ;
    }
}

export class BadRequestError extends HttpError {
    __brand = makeLit('BadRequestError');
    protected statusCode = 400;
}

export class UnauthorizedError extends HttpError {
    __brand = makeLit('UnauthorizedError');
    protected statusCode = 401;
}

export class NotFoundError extends HttpError {
    __brand = makeLit('NotFoundError');
    protected statusCode = 404;
}

export class UnprocessableEntityError extends HttpError {
    __brand = makeLit('UnprocessableEntityError');
    protected statusCode = 422;
}
