import { obj, ObjectIndex } from './obj';

export const objOf = <T extends {[K in ObjectIndex]: (x: unknown) => any}> (mapOfContracts: T) =>
    (x: unknown): {[K in keyof T]: ReturnType<T[K]>} => {
        const objValue = obj(x);

        Object.entries(mapOfContracts).forEach(([key, contract]) => {
            if (!(key in objValue)) {
                throw new Error(`Expected object to have "${key}" key`);
            }

            const propValue = objValue[key];
            contract(propValue);
        });

        return objValue as any;
    }
;
