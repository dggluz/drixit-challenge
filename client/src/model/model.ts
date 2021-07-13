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

export type Modelo = NotLogged | JwtAvailable | Logged;

let modelo: Modelo = {
	state: 'not-logged'
};

const getModel = () =>
	modelo
;

const setModel = (newModel: Modelo) => {
	modelo = newModel;

	notifyObservers(getModel());
};

const observers: ((model: Modelo) => void)[] = [];

const notifyObservers = (model: Modelo) => {
	observers.forEach(callback => callback(model));
};

export const subscribe = (callback: (model: Modelo) => void) => {
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
