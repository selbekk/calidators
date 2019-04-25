const LOWERCASE_REGEXP = /[a-z]+/;

export default config => value =>
    !LOWERCASE_REGEXP.test(value) ? config.message : null;
