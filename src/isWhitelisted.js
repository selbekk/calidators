export default config => value =>
    !config.whitelist.includes(value) ? config.message : null;
