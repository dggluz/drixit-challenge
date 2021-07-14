import { _Promise } from 'error-typed-promise';
import { InexistentUserError } from '../errors/inexistent-user.error';
import { isNotDefined } from '../type-validation/undef';
import { users } from '../users';
import { rejectIf } from '../utils/reject-if';

export const findUserByEmail = (email: string) =>
    _Promise
        .resolve(users.find(user => user.email === email))
        .then(rejectIf(
            isNotDefined,
            () => new InexistentUserError(email)
        ))
;
