import { Types, isInvalidType, isString } from './utilities';

export default config => value => {
    if (isString(value)) {
        return !config.regex.test(value) ? config.message : null;
    }

    return isInvalidType(value, [Types.string]);
};
