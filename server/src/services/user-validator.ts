import { lit } from '../type-validation/lit';
import { num } from '../type-validation/num';
import { objOf } from '../type-validation/obj-of';
import { str } from '../type-validation/str';
import { unionOf } from '../type-validation/union-of';

export const userValidator = objOf({
    id: str,
    avatar: str,
    age: num,
    email: str,
    name: str,
    role: unionOf(lit('admin'), lit('user')),
    surname: str,
    password: str,
});
