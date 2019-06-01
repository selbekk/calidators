import hasUppercase from '../hasUppercase';
import { INVALID_TYPE } from '../utilities';

const message = 'message';
const validate = hasUppercase({ message });

describe('hasUppercase validator', () => {
    it('accepts valid string containing uppercase character', () => {
        expect(validate('asdAA#2')).toBe(null);
        expect(validate('6as5AAA')).toBe(null);
        expect(validate('_A_111')).toBe(null);
        expect(validate('Hell0')).toBe(null);
    });

    it('rejects invalid string without uppercase character', () => {
        expect(validate('')).toBe(message);
        expect(validate('all lowercase')).toBe(message);
        expect(validate('abcdefgh')).toBe(message);
        expect(validate('123_@@@_bbb')).toBe(message);
        expect(validate('####look25')).toBe(message);
        expect(validate('love lowercase')).toBe(message);
        expect(validate('(/!&"#(')).toBe(message);
    });

    it('rejects invalid value type', () => {
        [0, [], {}, true, null, undefined].forEach((value, index) => {
            expect(validate(value)).toEqual(INVALID_TYPE);
            expect(console.error).toHaveBeenCalledTimes(index + 1);
        });
    });
});
