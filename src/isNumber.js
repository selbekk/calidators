import { isNumber, toNumber } from './utilities';

export default config => value =>
    !isNumber(config.strict ? value : toNumber(value)) ? config.message : null;
