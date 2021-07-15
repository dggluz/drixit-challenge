import { unknownError, _Promise } from 'error-typed-promise';

export const _promisify = <R> (fn: () => R): _Promise<R, unknownError> => {
    try {
        return _Promise.resolve(fn());
    }
    catch (e) {
        return _Promise.reject(e as unknownError);
    }
};

