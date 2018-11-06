const DIGIT_REGEXP = /\d+/;

export default config => value => {
    if (value === '') {
        return null;
    }
    return !DIGIT_REGEXP.test(value) ? config.message : null;
};
