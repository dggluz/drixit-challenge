export const omit = <T extends Record<PropertyKey, any>, K extends keyof T> (ommitedKey: K, obj: T) => {
    const { [ommitedKey]: ommited, ...ret} = obj;
    return ret;
};
