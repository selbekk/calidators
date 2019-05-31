import { isNil, isEmptyString } from './utilities';

export default config => value =>
    isNil(value) || isEmptyString(value) ? config.message : null;
