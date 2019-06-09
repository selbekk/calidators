import { whenValueIs } from './utilities';

export default config => value =>
    whenValueIs(
        value,
        {
            lessThan: null,
            equalTo: config.message,
            greaterThan: config.message,
        },
        config.value,
    );
