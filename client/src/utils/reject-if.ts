import { _Promise } from 'error-typed-promise';

type RejectIf = {
    <T, U extends T, E> (condition: (x: T) => x is U, errorGen: (x: U) => E): (x: T) => _Promise<Exclude<T, U>, E>;
    <T, E> (condition: (x: T) => boolean, errorGen: (x: T) => E): (x: T) => _Promise<T, E>;
}

export const rejectIf: RejectIf = <T, E> (condition: (x: T) => boolean, errorGen: (x: T) => E) =>
    (x: T): any =>
        condition(x) ?
            _Promise.reject(errorGen(x)) :
            _Promise.resolve(x)
;
