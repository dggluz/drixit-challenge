import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str'

const validateHtmlModule = objOf({
    default: str
});

export const readHtmlFile = (module: unknown) =>
    validateHtmlModule(module).default
;
