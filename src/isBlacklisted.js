import { toString } from './utilities';

export default config => value => {
    const blacklist = config.strict
        ? config.blacklist
        : config.blacklist.map(toString);

    return blacklist.includes(config.strict ? value : toString(value))
        ? config.message
        : null;
};
