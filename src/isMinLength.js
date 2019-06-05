import {
    Types,
    isInvalidType,
    isArray,
    isNumber,
    isObjectLike,
    isString,
} from './utilities';

export default config => value => {
    if (
        isArray(value) ||
        isString(value) ||
        (isObjectLike(value) && isNumber(value.length))
    ) {
        return value.length < config.length ? config.message : null;
    }

    return isInvalidType(value, [Types.array, Types.string]);
};
