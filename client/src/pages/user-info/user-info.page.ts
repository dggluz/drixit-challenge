import { ClientUser } from '../../model/model';
import { $get } from '../../utils/$get';
import { readHtmlFile } from '../../utils/read-html-file';

const html = readHtmlFile(require('./user-info.page.html'));

export const renderUserInfo = (userInfo: ClientUser) => {
    const $dom = $(html);

    $get($dom, '.name').text(`${userInfo.name} ${userInfo.surname}`);
    $get($dom, '.id').text(userInfo.id);
    $get($dom, '.avatar').attr('src', userInfo.avatar);
    $get($dom, '.age').text(userInfo.age);
    $get($dom, '.email').text(userInfo.email);
    $get($dom, '.role').text(userInfo.role === 'admin' ? 'Admin' : 'Regular user');

    return $dom;
};
