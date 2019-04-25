import hasDigit from '../hasDigit';

const message = 'message';
const validate = hasDigit({ message });

describe('hasDigit validator', () => {
    it('accepts valid string containing digit', () => {
        expect(validate('asdAA#2')).toBe(null);
        expect(validate('6as5AAA')).toBe(null);
        expect(validate('_A_111')).toBe(null);
        expect(validate('hell0')).toBe(null);
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
});
