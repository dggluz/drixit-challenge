import { createHash } from 'crypto';

export const hex_md5 = (value: string) =>
    createHash('md5').update(value).digest('hex')
;
