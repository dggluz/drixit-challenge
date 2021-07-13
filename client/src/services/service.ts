import { lit } from '../type-validation/lit';
import { num } from '../type-validation/num';
import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';
import { unionOf } from '../type-validation/union-of';

const PROTOCOL = 'http';
const DOMAIN = 'localhost';
const PORT = 8080;
const URL = `${PROTOCOL}://${DOMAIN}:${PORT}`;

const postJson = (path: string) => (data: unknown) =>
    fetch(`${URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
;

const handleError = (res: {status?: any;}) =>
    ('status' in res) && res.status === 'ERROR' ?
        Promise.reject(res) :
        Promise.resolve(res)
;

export const login = (email: string, password: string) =>
    postJson ('/api/v0/authenticate') ({
        email,
        password
    })
        .then(handleError)
        .then(objOf({
            jwt: str
        }))
;

export const getUser = (token: string) =>
    fetch(`${URL}/api/v0/users/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(handleError)
        .then(objOf({
            id: str,
            avatar: str,
            age: num,
            email: str,
            name: str,
            role: unionOf(lit('admin'), lit('user')),
            surname: str
        }))
;
