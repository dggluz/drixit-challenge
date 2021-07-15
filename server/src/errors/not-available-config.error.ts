import { makeLit } from '../utils/make-lit';

export class NotAvailableConfigError extends Error {
    __brand = makeLit('NotAvailableConfigError');

    constructor (configName: string) {
        super(`Not able to read config "${configName}"`);
    }
}
