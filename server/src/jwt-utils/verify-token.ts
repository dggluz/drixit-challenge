import { _Promise } from 'error-typed-promise';
import { JwtPayload, verify, VerifyErrors } from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../config/jwt-private-key';

export const verifyToken = (jwtToken: string) => new _Promise<JwtPayload, VerifyErrors>((resolve, reject) => {
    verify(jwtToken, JWT_PRIVATE_KEY, (err, payload) => {
        if (err) {
            reject(err);
        }
        else if (payload) {
            resolve(payload);
        }
        else {
            throw new Error('Should never happen: jsonwebtoken.verify');
        }
    });
});
