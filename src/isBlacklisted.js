export default config => value => {
    const stringBlacklist = config.blacklist.map(w => String(w));

    return stringBlacklist.includes(value) ? config.message : null;
};
