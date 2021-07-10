import { ClientUser } from '../../model/model';
import { str } from '../../type-validation/str';

const html = str(require('./user-info.page.html').default);

const $get = ($wrapper: JQuery<HTMLElement>, selector: string) => {
    const $ret = $wrapper.find(selector);

    if ($ret.length !== 1) {
        throw new Error(`Couldn't find element matching the selector "${selector}"`);
    }

    return $ret;
};

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
