import { _Promise } from 'error-typed-promise';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'restify';
import { UnauthorizedError } from '../errors/http-errors';
import { verifyToken } from '../jwt-utils/verify-token';
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
                .catch(err => _Promise.reject(new UnauthorizedError(err, 'INVALID_JWT')))
        )
        .then(jwtPayload => {
            (req as any).jwtPayload = jwtPayload;
            return req as R & { jwtPayload: JwtPayload };
        })
;
