import { _Promise } from 'error-typed-promise';
import { reset, setUser } from '../../model/model';
import { clearToken } from '../../persistence/persistence';
import { isExpectedResponseError } from '../../services/expected-response.error';
import { getUser } from '../../services/get-user';
import { $getBySelector } from '../../utils/$get';
import { assertNever } from '../../utils/assert-never';
import { assertUnknownError } from '../../utils/assert-unknown-error';
import { readHtmlFile } from '../../utils/read-html-file';
import { tapCatch } from '../../utils/tap-catch';

const html = readHtmlFile(require('./get-user-info.page.html'));

// Require styles
require('./get-user-info.page.less');

export const renderGetUserInfo = (jwt: string) => {
    const $dom = $(html);

    const $get = $getBySelector($dom);

    const showError = (error: string) => {
        $get('.loading-wrapper').addClass('d-none');
        $get('.error-wrapper').removeClass('d-none');
        $get('.error-message').text(error);

        $get('.accept-error').on('click', e => {
            e.preventDefault();

            // Restart the app as this state is not recoverable
            clearToken();
            reset();
        });
    };

    getUser(jwt)
        .then(setUser)
        .catch((err) => {
            if (isExpectedResponseError(err)) {
                const { errorCode } = err;
                switch (errorCode) {
                    case 'INVALID_JWT_PAYLOAD':
                        showError('The JWT payload is incorrect');
                        break;
                    case 'INEXISTENT_USER':
                        showError('The supplied email does not belong to any user');
                        break;
                    case 'NOT_AUTHENTICATED':
                        showError('The user is not authenticated');
                        break;
                    case 'INVALID_JWT':
                        showError('The JWT is invalid');
                        break;
                    default:
                        showError('There was an unexpected error.');
                        console.error(`Unexpected error code ${errorCode}`);
                        assertNever(errorCode);
                        break;
                }
        
                return _Promise.resolve(null);
            }

            return _Promise.reject(err);
        })
        .catch(tapCatch(console.error))
        .catch(assertUnknownError)
    ;

    return $dom;
};
