import isNumber from '../isNumber';

const message = 'fail';
const validate = isNumber({ message });

describe('isNumber validator', () => {
    it('accepts when value is a number', () => {
        expect(validate('-1')).toBe(null);
        expect(validate('1')).toBe(null);
        expect(validate('0')).toBe(null);
        expect(validate('1.000000001')).toBe(null);
        expect(validate('10e2')).toBe(null);
    });

    it('rejects when value is not a number', () => {
        expect(validate('')).toBe(message);
        expect(validate('not a number')).toBe(message);
        expect(validate('NaN')).toBe(message);
        expect(validate('12x21')).toBe(message);
    });
});
