import { _Promise } from 'error-typed-promise';
import { sign } from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../config/jwt-private-key';

export const createToken = (data: string | object | Buffer) => _Promise
    .resolve(sign(data, JWT_PRIVATE_KEY))
    .then(jwt => ({
        jwt
    }))
;
