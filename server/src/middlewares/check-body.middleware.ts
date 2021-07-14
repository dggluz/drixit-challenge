import { _Promise } from 'error-typed-promise';
import { BadRequestError } from '../errors/http-errors';
import { _promisify } from '../utils/_promisify';


export const checkBody = <A, R extends { body?: any }> (validation: (x: unknown) => A) =>
	(req: R) =>
		_promisify(() => validation(req.body))
            .catch(err => _Promise.reject(new BadRequestError(err, 'INVALID_BODY')))
			.then(() => req as Omit<R, 'body'> & {'body': A})
;
