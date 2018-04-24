export default config => value => {
    if (value === '') {
        return null;
    }
    return value.length > config.length ? config.message : null;
};
