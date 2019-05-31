import { Types, isInvalidType, isString } from './utilities';

const LOWERCASE_REGEXP = /[a-z]/;

export default config => value => {
    if (isString(value)) {
        return !LOWERCASE_REGEXP.test(value) ? config.message : null;
    }

    return isInvalidType(value, [Types.string]);
};
