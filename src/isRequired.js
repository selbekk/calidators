export default config => value =>
    [undefined, null, ''].includes(
        typeof value === 'string' ? value.trim() : value,
    )
        ? config.message
        : null;
