// Borrowed from http://emailregex.com/
// This is the same email regex as browsers use when type="email"
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default config => value =>
    !EMAIL_REGEXP.test(value) ? config.message : null;
