import { makeLit } from '../utils/make-lit';

export class ExpectedResponseError <E extends string> extends Error {
    errorCode: E;

    __brand = makeLit('ExpectedResponseError');

    constructor (responseError: {errorCode: E;}) {
        super(responseError.errorCode);

        this.errorCode = responseError.errorCode;
    }
}

export const isExpectedResponseError = (err: any): err is ExpectedResponseError<any> =>
    err.hasOwnProperty('__brand') && err.__brand === 'ExpectedResponseError'
;
