import { isStr } from '../type-validation/str';
import { isNotDefined } from '../type-validation/undef';

export const isError: (x: unknown) => x is Error = (x: any): x is Error => isStr(x.name) && isStr(x.message) && (isStr(x.stack) || isNotDefined(x.stack));
