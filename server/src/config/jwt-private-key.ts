import { readFileSync } from 'fs';
import { resolve } from 'path';
import { str } from '../type-validation/str';

// TODO: get the secrets path from secrets when dockerizing.
export const JWT_PRIVATE_KEY = readFileSync(resolve(__dirname, str('../../../JWT_PRIVATE_KEY')), 'utf-8');
