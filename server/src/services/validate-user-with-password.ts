import { _Promise } from 'error-typed-promise';
import { DocumentDoesNotExistError } from '../errors/document-does-not-exist.error';
import { InvalidUserPasswordError } from '../errors/invalid-user-password.error';
import { isInstanceOf } from '../type-validation/is-instance-of';
import { caseError } from '../utils/case-error';
import { hex_md5 } from '../utils/hex-md5';
import { findUser } from './find-user';

export const validateUserWithPassword = (email: string, password: string) =>
    findUser({
        email,
        password: hex_md5(password)
    })
        .catch(caseError(
            isInstanceOf(DocumentDoesNotExistError),
            () => _Promise.reject(new InvalidUserPasswordError(email, password))
        ))
;
