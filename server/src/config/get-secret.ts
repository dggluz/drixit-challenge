import { _Promise } from 'error-typed-promise';
import { resolve } from 'path';
import { FileSystemError } from '../errors/file-system.error';
import { UnavailableSecretError } from '../errors/unavailable-secret.error';
import { isInstanceOf } from '../type-validation/is-instance-of';
import { caseError } from '../utils/case-error';
import { readStrFile } from '../utils/read-str-file';
import { ConfigName } from './available-configs';

export const getSecret = (secretName: ConfigName) =>
    readStrFile(resolve('/run/secrets/', secretName))
        .catch(caseError(
            isInstanceOf(FileSystemError),
            err => _Promise.reject(new UnavailableSecretError(secretName, err))
        ))
;
