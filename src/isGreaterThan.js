import { whenValueIs } from './utilities';

export default config => value =>
    whenValueIs(
        value,
        {
            lessThan: config.message,
            equalTo: config.message,
            greaterThan: null,
        },
        config.value,
    );
