export interface ClientUser {
	id: string;
	avatar: string;
	age: number;
	email: string;
	name: string;
	role: 'admin' | 'user'
    surname: string;
}

export const model = {};

export type Model = typeof model;
