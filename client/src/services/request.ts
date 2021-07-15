import { _Promise } from 'error-typed-promise';
import { rejectIf } from '../utils/reject-if';
import { ExpectedResponseError } from './expected-response.error';
import { isExpectedError } from './is-expected-error';

const PROTOCOL = 'http';
const DOMAIN = 'localhost';
const PORT = 8080;
const URL = `${PROTOCOL}://${DOMAIN}:${PORT}`;

export const request = (path: RequestInfo, init: RequestInit | undefined = {}) =>
    _Promise.resolve(fetch(`${URL}${path}`, {
        headers: {
            'Content-type': 'application/json',
            ...(init && init.headers)
        },
        ...init
    }))
        .then(res => res.json())
        .then(rejectIf(
            isExpectedError,
            err => new ExpectedResponseError(err)
        ))
;

