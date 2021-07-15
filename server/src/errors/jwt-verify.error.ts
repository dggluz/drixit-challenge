import { VerifyErrors } from 'jsonwebtoken';
import { makeLit } from '../utils/make-lit';

export class JwtVerifyError extends Error {
    __brand = makeLit('JwtVerifyError');

    constructor (err: VerifyErrors) {
        super(err.message);
    }
}
