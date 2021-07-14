import { _Promise } from 'error-typed-promise';
import { createEndpoint } from '../server-utils/create-endpoint';

export const pingController = createEndpoint(() =>
    _Promise.resolve({
        connection: true
    })
);
