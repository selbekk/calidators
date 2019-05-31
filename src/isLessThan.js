import { Types, isInvalidType, isNumber, isString } from './utilities';

export default config => value => {
    if (isNumber(value) || isString(value)) {
        let inputValue = `${value}`;
        let testValue = `${config.value}`;
        const length = Math.max(inputValue.length, testValue.length);

        inputValue = inputValue.padStart(length, '0');
        testValue = testValue.padStart(length, '0');

        return inputValue >= testValue ? config.message : null;
    }

    return isInvalidType(value, [Types.number, Types.string]);
};
