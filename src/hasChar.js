import { Types, isInvalidType, isNumber, isString } from './utilities';

export default config => value => {
    if (isNumber(value) || isString(value)) {
        return !`${value}`.includes(`${config.char}`) ? config.message : null;
    }

    return isInvalidType(value, [Types.number, Types.string]);
};
