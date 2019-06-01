import hasDigit from '../hasDigit';
import { INVALID_TYPE } from '../utilities';

const message = 'message';
const validate = hasDigit({ message });

describe('hasDigit validator', () => {
    it('accepts valid value containing digit', () => {
        expect(validate('asdAA#2')).toBe(null);
        expect(validate('6as5AAA')).toBe(null);
        expect(validate('_A_111')).toBe(null);
        expect(validate('hell0')).toBe(null);
        expect(validate(101)).toBe(null);
    });

    it('rejects invalid string without digit', () => {
        expect(validate('')).toBe(message);
        expect(validate('no digits here')).toBe(message);
        expect(validate('maybe one, no')).toBe(message);
        expect(validate('asddAjoaisd$#')).toBe(message);
        expect(validate('####look')).toBe(message);
        expect(validate('OOO not zeros')).toBe(message);
        expect(validate('(/!&"#(')).toBe(message);
    });

    it('rejects invalid value type', () => {
        [[], {}, true, null, undefined].forEach((value, index) => {
            expect(validate(value)).toEqual(INVALID_TYPE);
            expect(console.error).toHaveBeenCalledTimes(index + 1);
        });
    });
});
