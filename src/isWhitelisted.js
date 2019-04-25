export default config => value => {
    const stringWhitelist = config.whitelist.map(w => String(w));

    return !stringWhitelist.includes(value) ? config.message : null;
};
