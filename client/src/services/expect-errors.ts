import { _Promise } from 'error-typed-promise';
import { ExpectedResponseError } from './expected-response.error';

export const expectErrors = <E extends string> () =>
    (err: ExpectedResponseError<string>) =>
        _Promise.reject(err as ExpectedResponseError<E>)
;
