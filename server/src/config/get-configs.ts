import { _Promise } from 'error-typed-promise';
import { ConfigName } from './available-configs';
import { getConfig } from './get-config';

export const getConfigs = <T extends Record<string, ConfigName>> (secrets: T) =>
    _Promise.all(Object
        .entries(secrets)
        .map(([key, secretName]) =>
            getConfig(secretName)
                .then((secret) => [key, secret])
        ))
        .then(entries => Object.fromEntries(entries) as {[K in keyof T]: string});
;
