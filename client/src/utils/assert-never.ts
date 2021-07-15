export const assertNever = (x: never) => {
    throw new Error(`Expected to never happen, but ${typeof x} found`);
};
