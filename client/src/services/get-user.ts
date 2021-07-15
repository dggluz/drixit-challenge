import { _Promise } from 'error-typed-promise';
import { lit } from '../type-validation/lit';
import { num } from '../type-validation/num';
import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';
import { unionOf } from '../type-validation/union-of';
import { caseError } from '../utils/case-error';
import { validateType } from '../utils/validate-type';
import { expectErrors } from './expect-errors';
import { isExpectedResponseError } from './expected-response.error';
import { request } from './request';


export const getUser = (token: string) =>
    request('/api/v0/users/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(validateType(objOf({
            id: str,
            avatar: str,
            age: num,
            email: str,
            name: str,
            role: unionOf(lit('admin'), lit('user')),
            surname: str
        })))
        .catch(caseError(
            isExpectedResponseError,
            expectErrors<'INVALID_JWT_PAYLOAD' | 'INEXISTENT_USER' | 'NOT_AUTHENTICATED' | 'INVALID_JWT'>()
        ))
;
