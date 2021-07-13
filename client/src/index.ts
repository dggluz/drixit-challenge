import { init, setToken, subscribeTo } from './model/model';
import { renderGetUserInfo } from './pages/get-user-info/get-user-info.page';
import { renderLogin } from './pages/login/login.page';
import { renderUserInfo } from './pages/user-info/user-info.page';
import { getToken, saveToken } from './persistence/persistence';

const showPage = (page: JQuery<HTMLElement>) => {
    $('#app')
        .empty()
        .append(page)
};

subscribeTo('not-logged', model => {
	showPage(renderLogin());
});

subscribeTo('jwt-available', model => {
    saveToken(model.jwt);
	showPage(renderGetUserInfo(model.jwt))
});

subscribeTo('logged', model =>
	showPage(renderUserInfo(model.user))
);

init();

const jwt = getToken();
if (jwt) {
    setToken(jwt);
}
