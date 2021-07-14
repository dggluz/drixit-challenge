import { _Promise } from 'error-typed-promise';
import { JwtPayload, verify, VerifyErrors } from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../config/jwt-private-key';
import { NotFoundError, UnauthorizedError, UnprocessableEntityError } from '../errors/http-errors';
import { TypeValidationError } from '../errors/type-validation-error';
import { caseError, createEndpoint } from '../server-utils/create-endpoint';
import { isInstanceOf } from '../type-validation/is-instance-of';
import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';
import { isNotDefined } from '../type-validation/undef';
import { users } from '../users';
import { omit } from '../utils/omit';
import { rejectIf } from '../utils/reject-if';
import { validateType } from '../utils/validate-type';

const verifyToken = (jwtToken: string) =>
    new _Promise<JwtPayload, VerifyErrors>((resolve, reject) => {
        verify(jwtToken, JWT_PRIVATE_KEY, (err, payload) => {
            if (err) {
                reject(err);
            }
            else if (payload) {
                resolve(payload);
            }
            else {
                throw new Error('Should never happen: jsonwebtoken.verify');
            }
        })
    })
;

export const getUserInfo = createEndpoint((req) => 
    _Promise
        .resolve(req)
        // TODO: move authentication to a middleware
        .then(req => req.header('Authorization', ''))
        .then(rejectIf(
            authHeader => authHeader.slice(0, 7) !== 'Bearer ',
            () => new UnauthorizedError('Bearer token not supplied', 'NOT_AUTHENTICATED')
        ))
        .then(authHeader => authHeader.slice(7))
        .then(jwtToken =>
            verifyToken(jwtToken)
                .catch(err => new UnauthorizedError(err, 'INVALID_JWT'))
        )
        .then(validateType(objOf({
            email: str
        })))
        .then(({ email }) => users.find(user => user.email === email))

        .then(rejectIf(
            isNotDefined,
            () => new NotFoundError('There is no user with the given email', 'INEXISTENT_USER')
        ))

        .catch(caseError(
            isInstanceOf(TypeValidationError),
            err => _Promise.reject(new UnprocessableEntityError(err, 'INVALID_JWT_PAYLOAD'))
        ))
        .then(user => omit('password', user))
);
