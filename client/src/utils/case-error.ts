import { _Promise } from 'error-typed-promise';


export const caseError = <ExpectedError, ResolvedResult, RejectedResult>(
    errPredicate: <E>(err: E | ExpectedError) => err is ExpectedError,
    errHandler: (err: ExpectedError) => _Promise<ResolvedResult, RejectedResult>
) => <CurrentError>(err: CurrentError): _Promise<ResolvedResult, RejectedResult | Exclude<CurrentError, ExpectedError>> => {
    if (errPredicate(err)) {
        return errHandler(err);
    }
    return _Promise.reject(err as Exclude<CurrentError, ExpectedError>);
};
