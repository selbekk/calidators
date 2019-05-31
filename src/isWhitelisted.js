import { toString } from './utilities';

export default config => value => {
    const whitelist = config.strict
        ? config.whitelist
        : config.whitelist.map(toString);

    return !whitelist.includes(config.strict ? value : toString(value))
        ? config.message
        : null;
};
