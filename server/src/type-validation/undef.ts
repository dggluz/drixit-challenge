export const isNotDefined = <T> (x: T | undefined): x is undefined =>
    typeof x === 'undefined'
;
