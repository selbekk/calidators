import isNumber from '../isNumber';

const message = 'fail';

describe('isNumber validator', () => {
    it('accepts when value is a number', () => {
        expect(isNumber({ message })('-1')).toBe(null);
        expect(isNumber({ message })('1')).toBe(null);
        expect(isNumber({ message })('0')).toBe(null);
        expect(isNumber({ message })('1.000000001')).toBe(null);
        expect(isNumber({ message })('10e2')).toBe(null);
    });

    it('rejects when value is not a number', () => {
        expect(isNumber({ message })('')).toBe(message);
        expect(isNumber({ message })('not a number')).toBe(message);
        expect(isNumber({ message })('NaN')).toBe(message);
        expect(isNumber({ message })('12x21')).toBe(message);
    });

    it('does not do type conversions when in strict mode', () => {
        expect(isNumber({ message, strict: true })('-1')).toBe(message);
        expect(isNumber({ message, strict: true })('1')).toBe(message);
        expect(isNumber({ message, strict: true })('0')).toBe(message);
        expect(isNumber({ message, strict: true })('1.000000001')).toBe(
            message,
        );
        expect(isNumber({ message, strict: true })('10e2')).toBe(message);
    });
});
