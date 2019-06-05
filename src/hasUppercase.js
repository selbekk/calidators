import { Types, isInvalidType, isString } from './utilities';

const UPPERCASE_REGEXP = /[A-Z]/;

export default config => value => {
    if (isString(value)) {
        return !UPPERCASE_REGEXP.test(value) ? config.message : null;
    }

    return isInvalidType(value, [Types.string]);
};
