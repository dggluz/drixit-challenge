import { unknownError, _Promise } from 'error-typed-promise';

export const assertUnknownError = (err: unknownError) =>
    _Promise.reject(err)
;
