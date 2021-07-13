import { Observable } from '../utils/observable';

export interface ClientUser {
	id: string;
	avatar: string;
	age: number;
	email: string;
	name: string;
	role: 'admin' | 'user'
    surname: string;
}



class _Model extends Observable<{
	'set-token': void;
	'reset-user': void;
}> {
	private _user?: ClientUser;
	private token?: string;

	setToken (user: ClientUser) {
		this._user = user;
		this._notifyObservers('set-token', undefined);
		return this;
	}

	resetUser () {
		this._user = undefined;
		this._notifyObservers('reset-user', undefined);
		return this;
	}

	getUser (): ClientUser {
		if (!this._user) {
			throw new Error('There is no user');
		}
		return this._user;
	}

	isLogged () {
		return typeof this._user !== 'undefined';
	}
}

export const model = new _Model();

export type Model = typeof model;
