const UPPERCASE_REGEXP = /[A-Z]+/;

export default config => value => {
    if (value === '') {
        return null;
    }
    return !UPPERCASE_REGEXP.test(value) ? config.message : null;
};
