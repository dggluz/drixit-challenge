import { _Promise } from 'error-typed-promise';
import { sign } from 'jsonwebtoken';
import { getConfig } from '../config/get-config';

export const createToken = (data: string | object | Buffer) =>
    getConfig('JWT_PRIVATE_KEY')
        .then(key => sign(data, key))
        .then(jwt => ({
            jwt
        }))
;
