import { _Promise } from 'error-typed-promise';
import { NotAvailableConfigError } from '../errors/not-available-config.error';
import { UnavailableSecretError } from '../errors/unavailable-secret.error';
import { isInstanceOf } from '../type-validation/is-instance-of';
import { caseError } from '../utils/case-error';
import { ConfigName } from './available-configs';
import { getEnv } from './get-env';
import { getSecret } from './get-secret';

export const getConfig = (configName: ConfigName) => {
    const envValue = getEnv(configName);
    if (typeof envValue === 'string') {
        return _Promise.resolve(envValue);
    }
    else {
        return getSecret(configName)
            .catch(caseError(
                isInstanceOf(UnavailableSecretError),
                err => _Promise.reject(new NotAvailableConfigError(configName))
            ))
        ;
    }
};
