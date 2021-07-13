import { EmailFormComponent } from '../../components/email-form/email-form.component';
import { ErrorLabelComponent } from '../../components/error-label/error-label.component';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';
import { Model } from '../../model/model';
import { $getBySelector } from '../../utils/$get';
import { readHtmlFile } from '../../utils/read-html-file';

const requestToken = (email: string, password: string) => {
    console.log(email, password);
    return new Promise<{ jwt: string }>((resolve, reject) => {
        setTimeout(() =>
            reject('There was an error trying to get the token ')
            // resolve({ jwt: 'jwt-token' })
        , 2000)
    });
};

const html = readHtmlFile(require('./login.page.html'));

export const renderLogin = (model: Model) => {
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

    const emailForm = new EmailFormComponent()
        .subscribe('set-editable', hidePassword)
        .subscribe('set-not-editable', showPassword)
        .appendTo($get('.email-wrapper'));
    
    const passwordForm = new PasswordFormComponent()
        .subscribe('submit', password => {
            disableForm();
            emptyError();

            requestToken(emailForm.getEmail(), password)
                .catch(showError)
                .finally(enableForm);
        })
        .appendTo($passwordWrapper);

    return $dom;
};

