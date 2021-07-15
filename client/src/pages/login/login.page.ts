import { EmailFormComponent } from '../../components/email-form/email-form.component';
import { ErrorLabelComponent } from '../../components/error-label/error-label.component';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';
import { $getBySelector } from '../../utils/$get';
import { readHtmlFile } from '../../utils/read-html-file';
import { login } from '../../services/login';
import { setToken } from '../../model/model';
import { isExpectedResponseError } from '../../services/expected-response.error';
import { _Promise } from 'error-typed-promise';
import { assertNever } from '../../utils/assert-never';
import { tap } from '../../utils/tap';
import { assertUnknownError } from '../../utils/assert-unknown-error';
import { tapCatch } from '../../utils/tap-catch';

const html = readHtmlFile(require('./login.page.html'));

export const renderLogin = () => {
    const $dom = $(html);

    const $get = $getBySelector($dom);
    
    const $passwordWrapper = $get('.password-wrapper');

    const showPassword = () => {
        $passwordWrapper.removeClass('invisible');
        passwordForm.focus();
    };

    const hidePassword = () => {
        $passwordWrapper.addClass('invisible');
    }

    const disableForm = () => {
        emailForm.disable();
    };

    const enableForm = () => {
        emailForm.enable();
        passwordForm
            .setEditableState()
            .focus();
    };

    const showError = (error: string) => {
        new ErrorLabelComponent(error)
            .appendTo(
                $get('.errors-wrapper')
                    .empty()
                    .removeClass('invisible')
            )
    };

    const emptyError = () => {
        $get('.errors-wrapper')
            .empty()
            .addClass('invisible');
    };

    const doLogin = (emailForm: EmailFormComponent, password: string) => {
        login(emailForm.getEmail(), password)
            .then(tap(({ jwt }) => {
                setToken(jwt);
            }))
            .catch((err) => {
                if (isExpectedResponseError(err)) {
                    const { errorCode } = err;
                    switch (errorCode) {
                        case 'INVALID_BODY':
                            showError('There was an error on the request.');
                            break;
                        case 'INVALID_USER_AUTH':
                            showError('Wrong user/password combination');
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
            .finally(enableForm);
    }

    const emailForm = new EmailFormComponent()
        .subscribe('set-editable', hidePassword)
        .subscribe('set-not-editable', showPassword)
        .appendTo($get('.email-wrapper'));
    
    const passwordForm = new PasswordFormComponent()
        .subscribe('submit', password => {
            disableForm();
            emptyError();

            doLogin(emailForm, password);
        })
        .appendTo($passwordWrapper);

    return $dom;
};
