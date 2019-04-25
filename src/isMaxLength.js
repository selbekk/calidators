export default config => value =>
    value.length > config.length ? config.message : null;
