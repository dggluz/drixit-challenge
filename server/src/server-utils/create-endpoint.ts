import { unknownError, _Promise } from 'error-typed-promise';
import { Next, Request, Response } from 'restify';
import { HttpErrors, isHttpError } from '../errors/http-errors';
import { tap } from '../utils/tap';
import { tapCatch } from '../utils/tap-catch';
import { caseError } from '../utils/case-error';

export const createEndpoint = <T> (controller: (req: Request) => _Promise<T, HttpErrors | unknownError>) =>
    (req: Request, res: Response, next: Next) => {
        return controller(req)
            .then(tap(() => {
                console.log(`Called ${ req.method } ${ req.path() }`)
            }))
            .then(tap(result =>
                res.json(200, result)
            ))
            // TODO: handle HttpErrors
            .catch(caseError(
                isHttpError,
                err => {
                    console.warn(err.getLoggingInfo());

                    res.json(err.getStatusCode(), {
                        errorCode: err.getErrorCode(),
                        status: 'ERROR'
                    });
                    return _Promise.resolve(null);
                }
            ))
            .catch(tapCatch(err => console.error('Unhandled error!', err)))
            .finally(next)
    }
;
