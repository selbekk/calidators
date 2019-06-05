import { Types, isInvalidType, isNumber, isString } from './utilities';

const NEGATIVE_REGEXP = /^-/;

export default config => value => {
    if (isNumber(value) || isString(value)) {
        let inputValue = `${value}`;
        let testValue = `${config.value}`;
        const inputIsNegative = NEGATIVE_REGEXP.test(inputValue);
        const testIsNegative = NEGATIVE_REGEXP.test(testValue);

        if (inputIsNegative && !testIsNegative) {
            return null;
        }

        if (!inputIsNegative && testIsNegative) {
            return config.message;
        }

        inputValue = inputValue.replace(NEGATIVE_REGEXP, '');
        testValue = testValue.replace(NEGATIVE_REGEXP, '');

        let [valInt, valDec = ''] = inputValue.split('.');
        let [testInt, testDec = ''] = testValue.split('.');
        const intLength = Math.max(valInt.length, testInt.length);
        const decLength = Math.max(valDec.length, testDec.length);

        valInt = valInt.padStart(intLength, '.');
        testInt = testInt.padStart(intLength, '.');

        valDec = valDec.padEnd(decLength, '0');
        testDec = testDec.padEnd(decLength, '0');

        inputValue = `${valInt}.${valDec}`;
        testValue = `${testInt}.${testDec}`;

        return (inputIsNegative && testIsNegative
          ? inputValue <= testValue
          : inputValue >= testValue)
            ? config.message
            : null;
    }

    return isInvalidType(value, [Types.number, Types.string]);
};
