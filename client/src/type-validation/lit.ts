import { assert } from './assert';

export const isLiteral = <L extends Literal> (literal: L) => (x: unknown): x is L =>
    x === literal
;

type Literal = number | string | boolean;

export const lit = <L extends Literal> (literal: L) => assert(isLiteral(literal));
