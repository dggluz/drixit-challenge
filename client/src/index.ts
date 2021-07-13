import { init, Modelo, setUser, subscribe } from './model/model';
import { renderLogin } from './pages/login/login.page';
import { renderUserInfo } from './pages/user-info/user-info.page';

const showPage = (page: JQuery<HTMLElement>) => {
    $('#app')
        .empty()
        .append(page)
};

type DiscriminateModel<S extends Modelo['state']> = Extract<Modelo, Record<'state', S>>;

const isState = <S extends Modelo['state']> (state: S, model: Modelo): model is DiscriminateModel<S> =>
		model.state === state
;

const subscribeTo = <S extends Modelo['state']> (state: S, callback: (model: DiscriminateModel<S>) => void) => {
		subscribe(model => {
			if (isState(state, model)) {
				callback(model);
			}
		});
	}
;

subscribeTo('not-logged', model => {
	showPage(renderLogin());
});

subscribeTo('jwt-available', model => {
	// Mock set user
	setTimeout(() => setUser({
		id: "it-drixit-1",
		avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png",
		email: "it@drixit.com",
		name: "IT",
		surname: "Drixit",
		age: 25,
		role: "admin"
	}), 2000);
	console.log('jwt available', model.jwt);
});

subscribeTo('logged', model => showPage(renderUserInfo(model.user)));

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