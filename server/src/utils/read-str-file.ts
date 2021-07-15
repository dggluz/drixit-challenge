import { _Promise } from 'error-typed-promise';
import { readFile } from 'fs';
import { FileSystemError } from '../errors/file-system.error';

export const readStrFile = (path: string) =>
    new _Promise<string, FileSystemError>((resolve, reject) => {
        readFile(path, 'utf-8', (err, content) => {
            if (err) {
                reject(new FileSystemError(err))
            }
            else {
                resolve(content);
            }
        })
    })
;
