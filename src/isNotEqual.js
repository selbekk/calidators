import { getType, toString } from './utilities';

export default config => value =>
    (!config.strict || getType(value) === getType(config.value)) &&
    toString(value) === toString(config.value)
        ? config.message
        : null;
