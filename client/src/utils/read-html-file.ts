import { assert } from '../type-validation/assert';
import { str } from '../type-validation/str'

type ObjectIndex = string | number | symbol;

const isObj = (x: unknown): x is { [key in ObjectIndex]: unknown } =>
    typeof x === 'object' && x !== null
;

const obj = assert(isObj);

const objOf = <T extends {[K in ObjectIndex]: (x: unknown) => any}> (mapOfContracts: T) =>
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

const validateHtmlModule = objOf({
    default: str
});

export const readHtmlFile = (module: unknown) =>
    validateHtmlModule(module).default
;
