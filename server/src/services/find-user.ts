import { _Promise } from 'error-typed-promise';
import { Filter } from 'mongodb';
import { findOneDocument } from '../db/find-one';
import { InvalidDocumentError } from '../errors/invalid-document.error';
import { TypeValidationError } from '../errors/type-validation-error';
import { isInstanceOf } from '../type-validation/is-instance-of';
import { caseError } from '../utils/case-error';
import { validateType } from '../utils/validate-type';
import { userValidator } from './user-validator';

export const findUser = (criteria: Filter<ReturnType<typeof userValidator>>) =>
    findOneDocument('users', criteria)
        .then(validateType(userValidator))
        .catch(caseError(
            isInstanceOf(TypeValidationError),
            err => _Promise.reject(new InvalidDocumentError(err, 'users'))
        ))
;