import { _Promise } from 'error-typed-promise';
import { DocumentDoesNotExistError } from '../errors/document-does-not-exist.error';
import { InexistentUserError } from '../errors/inexistent-user.error';
import { isInstanceOf } from '../type-validation/is-instance-of';
import { caseError } from '../utils/case-error';
import { findUser } from './find-user';

export const findUserByEmail = (email: string) =>
    findUser({
        email
    })
        .then(x => x)
        .catch(caseError(
            isInstanceOf(DocumentDoesNotExistError),
            () => _Promise.reject(new InexistentUserError(email))
        ))
        .then(x => x)
;
