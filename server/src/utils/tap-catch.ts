import { _Promise } from 'error-typed-promise';

export const tapCatch = <E>(fn: (err: E) => any) => (err: E) => {
    fn(err);
    return _Promise.reject(err);
};
