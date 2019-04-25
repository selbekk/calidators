const UPPERCASE_REGEXP = /[A-Z]+/;

export default config => value =>
    !UPPERCASE_REGEXP.test(value) ? config.message : null;
