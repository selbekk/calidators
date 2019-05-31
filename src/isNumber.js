import { isNumber, toNumber } from './utilities';

export default config => value =>
    isNumber(toNumber(value)) ? config.message : null;
