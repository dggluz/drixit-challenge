import { EmailFormComponent } from '../../components/email-form/email-form.component';
import { PasswordFormComponent } from '../../components/password-form/password-form.component';
import { Model } from '../../model/model';
import { $getBySelector } from '../../utils/$get';
import { readHtmlFile } from '../../utils/read-html-file';

const requestToken = (email: string, password: string) => {
    console.log(email, password);
    return new Promise<{ jwt: string }>(resolve => {
        setTimeout(() => resolve({ jwt: 'jwt-token' }), 2000)
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

    const emailForm = new EmailFormComponent()
        .subscribe('set-editable', hidePassword)
        .subscribe('set-not-editable', showPassword)
        .appendTo($get('.email-wrapper'));
    
    const passwordForm = new PasswordFormComponent()
        .subscribe('submit', password => {
            emailForm.disable();
            requestToken(emailForm.getEmail(), password)
                .then(token => {
                    console.log(token);
                    emailForm.enable();
                    passwordForm
                        .setEditableState()
                        .focus();
                });
        })
        .appendTo($passwordWrapper);

    return $dom;
};

