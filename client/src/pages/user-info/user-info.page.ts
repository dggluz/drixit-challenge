import { ClientUser, reset } from '../../model/model';
import { clearToken } from '../../persistence/persistence';
import { $getBySelector } from '../../utils/$get';
import { readHtmlFile } from '../../utils/read-html-file';

const html = readHtmlFile(require('./user-info.page.html'));

export const renderUserInfo = (userInfo: ClientUser) => {
    const $dom = $(html);

    const $get = $getBySelector($dom);

    $get('.name').text(`${userInfo.name} ${userInfo.surname}`);
    $get('.id').text(userInfo.id);
    $get('.avatar').attr('src', userInfo.avatar);
    $get('.age').text(userInfo.age);
    $get('.email').text(userInfo.email);
    $get('.role').text(userInfo.role === 'admin' ? 'Admin' : 'Regular user');


    $get('.log-out').on('click', e => {
        e.preventDefault();
        clearToken();
        reset();
    });

    return $dom;
};
