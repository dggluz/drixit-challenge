import { unknownError, _Promise } from 'error-typed-promise';
import { Next, Request, Response } from 'restify';
import { HttpErrors, isHttpError } from '../errors/http-errors';
import { tap } from '../utils/tap';
import { tapCatch } from '../utils/tap-catch';

export const caseError = <ExpectedError, ResolvedResult, RejectedResult>(
    errPredicate: <E>(err: E | ExpectedError) => err is ExpectedError,
    errHandler: (err: ExpectedError) => _Promise<ResolvedResult, RejectedResult>
) => <CurrentError> (err: CurrentError): _Promise<ResolvedResult, RejectedResult | Exclude<CurrentError, ExpectedError>> => {
    if (errPredicate(err)) {
        return errHandler(err);
    }
    return _Promise.reject(err as Exclude<CurrentError, ExpectedError>);
};

export const createEndpoint = <T> (controller: (req: Request) => _Promise<T, HttpErrors | unknownError>) =>
    (req: Request, res: Response, next: Next) => {
        return controller(req)
            .then(tap(() => {
                console.log(`Called ${ req.method } ${ req.path }`)
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
