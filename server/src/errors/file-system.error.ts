import { makeLit } from '../utils/make-lit';

export class FileSystemError extends Error {
    __brand = makeLit('FileSystemError');

    constructor (e: NodeJS.ErrnoException) {
        super (e.message);
    }
}
