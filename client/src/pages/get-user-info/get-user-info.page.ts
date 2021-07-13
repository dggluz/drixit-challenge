import { setUser } from '../../model/model';
import { getUser } from '../../services/service';
import { readHtmlFile } from '../../utils/read-html-file';

const html = readHtmlFile(require('./get-user-info.page.html'));

// Require styles
require('./get-user-info.page.less');

export const renderGetUserInfo = (jwt: string) => {
    const $dom = $(html);

    getUser(jwt)
        // TODO: handle errors
        .then(setUser);

    return $dom;
};
