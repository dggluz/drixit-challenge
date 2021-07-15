export interface ClientUser {
	id: string;
	avatar: string;
	age: number;
	email: string;
	name: string;
	role: 'admin' | 'user'
    surname: string;
}


type NotLogged = {
	state: 'not-logged';
};

type JwtAvailable = {
	state: 'jwt-available';
	jwt: string;
};

type Logged = {
	state: 'logged';
	user: ClientUser;
};

export type Model = NotLogged | JwtAvailable | Logged;

let model: Model = {
	state: 'not-logged'
};

const getModel = () =>
	model
;

const setModel = (newModel: Model) => {
	model = newModel;

	notifyObservers(getModel());
};

const observers: ((model: Model) => void)[] = [];

const notifyObservers = (model: Model) => {
	observers.forEach(callback => callback(model));
};

export const subscribe = (callback: (model: Model) => void) => {
	observers.push(callback);
};

export const reset = () =>
	setModel({
		state: 'not-logged'
	})
;

export const setToken = (token: string) =>
	setModel({
		state: 'jwt-available',
		jwt: token
	})
;

export const setUser = (user: ClientUser) =>
	setModel({
		state: 'logged',
		user
	})
;

export const init = () => notifyObservers(getModel());


type DiscriminateModel<S extends Model['state']> = Extract<Model, Record<'state', S>>;

const isState = <S extends Model['state']> (state: S, model: Model): model is DiscriminateModel<S> =>
		model.state === state
;

export const subscribeTo = <S extends Model['state']> (state: S, callback: (model: DiscriminateModel<S>) => void) => {
		subscribe(model => {
			if (isState(state, model)) {
				callback(model);
			}
		});
	}
;
