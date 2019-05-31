import { Types, isArray, isString, isInvalidType } from './utilities';

export default config => value => {
    if (isArray(value) || isString(value)) {
        return value.length < config.length ? config.message : null;
    }

    return isInvalidType(value, [Types.array, Types.string]);
};
