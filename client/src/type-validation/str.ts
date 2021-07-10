import { assert } from './assert';

export const isStr = (x: unknown): x is string =>
    typeof x === 'string'
;

export const str = assert(isStr);
