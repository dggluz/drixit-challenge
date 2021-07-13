import { init, subscribeTo } from './model/model';
import { renderGetUserInfo } from './pages/get-user-info/get-user-info.page';
import { renderLogin } from './pages/login/login.page';
import { renderUserInfo } from './pages/user-info/user-info.page';

const showPage = (page: JQuery<HTMLElement>) => {
    $('#app')
        .empty()
        .append(page)
};

subscribeTo('not-logged', model => {
	showPage(renderLogin());
});

subscribeTo('jwt-available', model =>
	showPage(renderGetUserInfo(model.jwt))
);

subscribeTo('logged', model =>
	showPage(renderUserInfo(model.user))
);

init();


// export function isDiscriminate<K extends PropertyKey, V extends string | number | boolean>(
//     discriminantKey: K, discriminantValue: V | V[]
// ) {
//     return <T extends Record<K, any>>(
//         obj: T & Record<K, V extends T[K] ? T[K] : V>
//     ): obj is Extract<T, Record<K, V>> =>
//         Array.isArray(discriminantValue) 
//             ? discriminantValue.some(v => obj[discriminantKey] === v)
//             : obj[discriminantKey] === discriminantValue;
// }