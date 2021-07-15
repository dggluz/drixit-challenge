import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';
import { caseError } from '../utils/case-error';
import { isExpectedResponseError } from './expected-response.error';
import { expectErrors } from './expect-errors';
import { request } from './request';

export const login = (email: string, password: string) =>
    request('/api/v0/authenticate', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(objOf({
            jwt: str
        }))
        .catch(caseError(
            isExpectedResponseError,
            expectErrors<'INVALID_BODY' | 'INVALID_USER_AUTH'>()
        ))
;
