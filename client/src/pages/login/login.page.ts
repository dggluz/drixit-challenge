import { $getBySelector } from '../../utils/$get';
import { readHtmlFile } from '../../utils/read-html-file';

export const renderLogin = () => {
    const $dom = $(readHtmlFile(require('./login.page.html')));

    const $get = $getBySelector($dom);

    const $emailForm = $get('.email-form');
    const $passwordForm = $get('.password-form');

    $emailForm.on('submit', (e) => {
        e.preventDefault();

        $passwordForm.removeClass('invisible');
    });

    return $dom;
};
