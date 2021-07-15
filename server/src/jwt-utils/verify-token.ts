import { _Promise } from 'error-typed-promise';
import { JwtPayload, verify } from 'jsonwebtoken';
import { getConfig } from '../config/get-config';
import { JwtVerifyError } from '../errors/jwt-verify.error';

export const verifyToken = (jwtToken: string) =>
    getConfig('JWT_PRIVATE_KEY')
        .then(key => new _Promise<JwtPayload, JwtVerifyError>((resolve, reject) => {
            verify(jwtToken, key, (err, payload) => {
                if (err) {
                    reject(new JwtVerifyError(err));
                }
                else if (payload) {
                    resolve(payload);
                }
                else {
                    throw new Error('Should never happen: jsonwebtoken.verify');
                }
            })
        })
    )
;
