type Literal = string | number | boolean;

export const makeLit = <T extends Literal>(x: T) =>
    x
;
