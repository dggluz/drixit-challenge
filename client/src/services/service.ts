import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';

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

export const requestToken = (email: string, password: string) => {
    console.log(email, password);

    return postJson ('/api/v0/authenticate') ({
        email,
        password
    })
        .then(handleError)
        .then(objOf({
            jwt: str
        }))
    ;
};
