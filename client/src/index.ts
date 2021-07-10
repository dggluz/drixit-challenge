import { model } from './model/model';
import { renderLogin } from './pages/login/login.page';
import { renderUserInfo } from './pages/user-info/user-info.page';

const showPage = (page: JQuery<HTMLElement>) => {
    $('#app')
        .empty()
        .append(page)
};

const loginPage = renderLogin(model);

const userInfoPage = renderUserInfo({
	id: "it-drixit-1",
	avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
	email: "it@drixit.com",
	name: "IT",
	surname: "Drixit",
	age: 25,
	role: "admin"
});

showPage(loginPage);
