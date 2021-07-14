import { _Promise } from 'error-typed-promise';
import { BadRequestError } from '../errors/http-errors';
import { checkBody } from '../middlewares/check-body.middleware';
import { createEndpoint } from '../server-utils/create-endpoint';
import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';
import { isNotDefined } from '../type-validation/undef';
import { users } from '../users';
import { rejectIf } from '../utils/reject-if';
import { createToken } from '../jwt-utils/create-token';

const lookupUser = (email: string, password: string) =>
    users.find(user =>
        user.email === email && user.password === password
    )
;

export const authenticateController = createEndpoint(req =>
    _Promise
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
        .then(({ email }) => createToken({
            email
        }))
);
