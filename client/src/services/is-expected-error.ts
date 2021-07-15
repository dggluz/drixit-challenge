export const isExpectedError = (res: any): res is {status: 'ERROR', errorCode: string} =>
    res.hasOwnProperty('status') && res.status === 'ERROR' && typeof res.errorCode === 'string'
;
