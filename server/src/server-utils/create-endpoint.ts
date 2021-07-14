import { unknownError, _Promise } from 'error-typed-promise';
import { Next, Request, Response } from 'restify';

type HttpError = never;

const tap = <T> (fn: (x: T) => any) =>
    (x: T) => {
        fn(x);
        return x;
    }
;

const tapCatch = <E> (fn: (err: E) => any) =>
    (err: E) => {
        fn(err);
        return _Promise.reject(err);
    }
;

export const createEndpoint = <T> (controller: (req: Request) => _Promise<T, unknownError>) =>
    (req: Request, res: Response, next: Next) => {
        return controller(req)
            .then(x => x)
            .then(tap(result =>
                res.json(200, result)
            ))
            // TODO: handle HttpErrors
            .catch(tapCatch(err => console.error('Unhandled error!', err)))
            .finally(next)
    }
;
