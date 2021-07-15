import { _Promise } from 'error-typed-promise';
import { NotFoundError, UnprocessableEntityError } from '../errors/http-errors';
import { TypeValidationError } from '../errors/type-validation-error';
import { createEndpoint } from '../server-utils/create-endpoint';
import { caseError } from "../utils/case-error";
import { isInstanceOf } from '../type-validation/is-instance-of';
import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';
import { omit } from '../utils/omit';
import { validateType } from '../utils/validate-type';
import { authenticate } from '../middlewares/authenticate.middleware';
import { findUserByEmail } from '../services/find-user-by-email';
import { InexistentUserError } from '../errors/inexistent-user.error';
import { ignoreErrors } from '../utils/ignore-errors';
import { NotAvailableConfigError } from '../errors/not-available-config.error';

export const getUserInfo = createEndpoint((req) => 
    _Promise
        .resolve(req)
        .then(authenticate)
        .then(req => req.jwtPayload)
        .then(validateType(objOf({
            email: str
        })))

        .then(({ email } )=> findUserByEmail(email))
        .then(user => omit('password', user))

        .catch(caseError(
            isInstanceOf(TypeValidationError),
            err => _Promise.reject(new UnprocessableEntityError(err, 'INVALID_JWT_PAYLOAD'))
        ))
        .catch(caseError(
            isInstanceOf(InexistentUserError),
            () => _Promise.reject(new NotFoundError('There is no user with the given email', 'INEXISTENT_USER'))
        ))
        .catch(ignoreErrors([NotAvailableConfigError]))
);
