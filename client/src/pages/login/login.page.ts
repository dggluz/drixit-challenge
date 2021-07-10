import { EmailFormComponent } from '../../components/email-form/email-form.component';
import { Model } from '../../model/model';
import { $getBySelector } from '../../utils/$get';
import { readHtmlFile } from '../../utils/read-html-file';

const requestToken = () => Promise.resolve({ jwt: 'jwt-token' });

const html = readHtmlFile(require('./login.page.html'));

export const renderLogin = (model: Model) => {
    const $dom = $(html);

    const $get = $getBySelector($dom);

    new EmailFormComponent().appendTo($get('.email-wrapper'));

    const $passwordForm = $get('.password-form');

    $passwordForm.on('submit', e => {
        e.preventDefault();

        $dom.find('input, button[type=submit]').attr('disabled', 'disabled');
        $get('.password-form button[type=submit] .active-state').addClass('d-none');
        $get('.password-form button[type=submit] .loading-state').removeClass('d-none');

        requestToken()
            .then()
        ;
    });

    return $dom;
};

