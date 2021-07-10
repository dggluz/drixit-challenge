import { renderUserInfo } from './pages/user-info/user-info.page';

const showPage = (page: JQuery<HTMLElement>) => {
    $('#app')
        .empty()
        .append(page)
};


const userInfoPage = renderUserInfo({
	id: "it-drixit-1",
	avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
	email: "it@drixit.com",
	name: "IT",
	surname: "Drixit",
	age: 25,
	role: "admin"
});

showPage(userInfoPage);
