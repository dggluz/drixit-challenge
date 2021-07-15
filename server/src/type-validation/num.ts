import { assert } from './assert';

export const isNum = (x: unknown): x is number =>
    typeof x === 'number'
;

export const num = assert(isNum);
