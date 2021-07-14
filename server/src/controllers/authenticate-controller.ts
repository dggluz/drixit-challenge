import { _Promise } from 'error-typed-promise';
import { sign } from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../config/jwt-private-key';
import { BadRequestError } from '../errors/http-errors';
import { checkBody } from '../middlewares/check-body.middleware';
import { createEndpoint } from '../server-utils/create-endpoint';
import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';
import { users } from '../users';

const lookupUser = (email: string, password: string) =>
    users.find(user =>
        user.email === email && user.password === password
    )
;

type RejectIf = {
    <T, U extends T, E> (condition: (x: T) => x is U, errorGen: (x: U) => E): (x: T) => _Promise<Exclude<T, U>, E>;
    <T, E> (condition: (x: T) => boolean, errorGen: (x: T) => E): (x: T) => _Promise<T, E>;
}

const rejectIf: RejectIf = <T, E> (condition: (x: T) => boolean, errorGen: (x: T) => E) =>
    (x: T): any =>
        condition(x) ?
            _Promise.reject(errorGen(x)) :
            _Promise.resolve(x)
;

const isNotDefined = <T> (x: T | undefined): x is undefined =>
    typeof x === 'undefined'
;

export const authenticateController = createEndpoint(req => {
    console.log('Authenticate');

    return _Promise
        .resolve(req)
        .then(checkBody(objOf({
            email: str,
            password: str
        })))
        .then(({ body }) => lookupUser(body.email, body.password))
        .then(rejectIf(
            isNotDefined,
            () => new BadRequestError('User/password combination not found', 'INVALID_USER_AUTH')
        ))
        .then(user => sign({
                email: user.email
            }, JWT_PRIVATE_KEY)
        )
        .then(jwt => ({
            jwt
        }))
    ;
});
