const LOWERCASE_REGEXP = /[a-z]+/;

export default config => value => {
    if (value === '') {
        return null;
    }
    return !LOWERCASE_REGEXP.test(value) ? config.message : null;
};
