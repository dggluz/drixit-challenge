import { init, setToken, subscribeTo } from './model/model';
import { renderGetUserInfo } from './pages/get-user-info/get-user-info.page';
import { renderLogin } from './pages/login/login.page';
import { renderUserInfo } from './pages/user-info/user-info.page';
import { getToken, saveToken } from './persistence/persistence';
import { navigateTo } from './routes/routing';

const showPage = (page: JQuery<HTMLElement>) => {
    $('#app')
        .empty()
        .append(page)
};

subscribeTo('not-logged', model => {
    navigateTo('login');
    document.title = 'Login';
	showPage(renderLogin());
});

subscribeTo('jwt-available', model => {
    navigateTo('get-user-info');
    document.title = 'Getting user information...'
    saveToken(model.jwt);
	showPage(renderGetUserInfo(model.jwt))
});

subscribeTo('logged', model => {
    navigateTo('user-info');
    document.title = `${model.user.name} ${model.user.surname} profile`;
    showPage(renderUserInfo(model.user));
});

init();

const jwt = getToken();
if (jwt) {
    setToken(jwt);
}
