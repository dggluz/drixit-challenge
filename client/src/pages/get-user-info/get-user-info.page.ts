import { readHtmlFile } from '../../utils/read-html-file';

const html = readHtmlFile(require('./get-user-info.page.html'));

// Require styles
require('./get-user-info.page.less');

export const renderGetUserInfo = (jwt: string) => {
    const $dom = $(html);

    return $dom;
};
