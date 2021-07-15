import { _Promise } from 'error-typed-promise';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'restify';
import { UnauthorizedError } from '../errors/http-errors';
import { JwtVerifyError } from '../errors/jwt-verify.error';
import { verifyToken } from '../jwt-utils/verify-token';
import { isInstanceOf } from '../type-validation/is-instance-of';
import { caseError } from '../utils/case-error';
import { rejectIf } from '../utils/reject-if';

export const authenticate = <R extends Request>(req: R) =>
    _Promise
        .resolve(req)
        .then(req => req.header('Authorization', ''))
        .then(rejectIf(
            authHeader => authHeader.slice(0, 7) !== 'Bearer ',
            () => new UnauthorizedError('Bearer token not supplied', 'NOT_AUTHENTICATED')
        ))
        .then(authHeader => authHeader.slice(7))
        .then(jwtToken =>
            verifyToken(jwtToken)
                .catch(caseError(
                    isInstanceOf(JwtVerifyError),
                    err => _Promise.reject(new UnauthorizedError(err, 'INVALID_JWT'))
                ))
        )
        .then(jwtPayload => {
            (req as any).jwtPayload = jwtPayload;
            return req as R & { jwtPayload: JwtPayload };
        })
;
