import { Types, isInvalidType, isString } from './utilities';

// Borrowed from http://emailregex.com/
// This is the same email regex as browsers use when type="email"
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default config => value => {
    if (isString(value)) {
        return !EMAIL_REGEXP.test(value) ? config.message : null;
    }

    return isInvalidType(value, [Types.string]);
};
