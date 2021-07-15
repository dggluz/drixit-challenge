import { config } from 'dotenv';
import { ConfigName } from './available-configs';

config();

export const getEnv = (configName: ConfigName) =>
    process.env[configName]
;