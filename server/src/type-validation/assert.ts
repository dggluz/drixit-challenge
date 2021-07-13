export const assert = <T> (typeGuard: (x: unknown) => x is T, expectedType?: string) => (x: unknown) => {
    if (!typeGuard(x)) {
        const errorMessage = expectedType ?
            `Unexpected type "${typeof x}", ${expectedType} expected`:
            `Unexpected type "${typeof x}"`
        ;
        throw new Error(errorMessage);
    }
    return x;
};
