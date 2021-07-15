import { _Promise } from 'error-typed-promise';
import { BadRequestError } from '../errors/http-errors';
import { checkBody } from '../middlewares/check-body.middleware';
import { createEndpoint } from '../server-utils/create-endpoint';
import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';
import { createToken } from '../jwt-utils/create-token';
import { validateUserWithPassword } from '../services/validate-user-with-password';
import { isInstanceOf } from '../type-validation/is-instance-of';
import { InvalidUserPasswordError } from '../errors/invalid-user-password.error';
import { caseError } from '../utils/case-error';
import { ignoreErrors } from '../utils/ignore-errors';
import { NotAvailableConfigError } from '../errors/not-available-config.error';
import { MongoError } from '../errors/mongo.error';
import { InvalidDocumentError } from '../errors/invalid-document.error';

export const authenticateController = createEndpoint(req =>
    _Promise
        .resolve(req)
        .then(checkBody(objOf({
            email: str,
            password: str
        })))
        .then(({ body }) => validateUserWithPassword(body.email, body.password))
        .then(({ email }) => createToken({
            email
        }))

        .catch(caseError(
            isInstanceOf(InvalidUserPasswordError),
            () => _Promise.reject(new BadRequestError('User/password combination not found', 'INVALID_USER_AUTH'))
        ))
        .catch(ignoreErrors([NotAvailableConfigError, MongoError, InvalidDocumentError]))
);
