import { _Promise } from 'error-typed-promise';
import { BadRequestError } from '../errors/http-errors';
import { TypeValidationError } from '../errors/type-validation-error';
import { caseError } from '../server-utils/create-endpoint';
import { isInstanceOf } from '../type-validation/is-instance-of';
import { validateType } from '../utils/validate-type';
import { _promisify } from '../utils/_promisify';

export const checkBody = <A, R extends { body?: any }> (validation: (x: unknown) => A) =>
	(req: R) =>
		validateType (validation) (req.body)
            .catch(
				caseError(
					isInstanceOf(TypeValidationError),
					err => _Promise.reject(new BadRequestError(err, 'INVALID_BODY'))
				)
			)
			.then(() => req as Omit<R, 'body'> & {'body': A})
;
