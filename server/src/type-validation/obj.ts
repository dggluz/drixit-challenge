import { assert } from './assert';

export type ObjectIndex = string | number | symbol;

export const isObj = (x: unknown): x is { [key in ObjectIndex]: unknown } =>
    typeof x === 'object' && x !== null
;

export const obj = assert(isObj);
