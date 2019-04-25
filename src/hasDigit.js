const DIGIT_REGEXP = /\d+/;

export default config => value =>
    !DIGIT_REGEXP.test(value) ? config.message : null;
