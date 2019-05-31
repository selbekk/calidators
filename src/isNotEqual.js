import { getType } from './utilities';

export default config => value =>
    getType(config.value) === getType(value) &&
    JSON.stringify(config.value) === JSON.stringify(value)
        ? config.message
        : null;
