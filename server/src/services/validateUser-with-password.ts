import { _Promise } from 'error-typed-promise';
import { InvalidUserPasswordError } from '../errors/invalid-user-password.error';
import { isNotDefined } from '../type-validation/undef';
import { users } from '../users';
import { rejectIf } from '../utils/reject-if';

export const validateUserWithPassword = (email: string, password: string) =>
    _Promise
        .resolve(users.find(user => user.email === email && user.password === password))
        .then(rejectIf(
            isNotDefined,
            () => new InvalidUserPasswordError(email, password)
        ))
;
