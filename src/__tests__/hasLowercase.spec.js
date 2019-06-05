import hasLowercase from '../hasLowercase';
import { INVALID_TYPE } from '../utilities';

const message = 'message';
const validate = hasLowercase({ message });

describe('hasLowercase validator', () => {
    it('accepts valid string containing lowercase character', () => {
        expect(validate('asdAA#2')).toBe(null);
        expect(validate('6as5AAA')).toBe(null);
        expect(validate('_aA_111')).toBe(null);
        expect(validate('Hell0')).toBe(null);
    });

    it('rejects invalid string without lowercase character', () => {
        expect(validate('')).toBe(message);
        expect(validate('789 566 200')).toBe(message);
        expect(validate('I AM SCREAMING')).toBe(message);
        expect(validate('123_@@@_BBB')).toBe(message);
        expect(validate('####LOOK25')).toBe(message);
        expect(validate('LOVE UPPERCASE')).toBe(message);
        expect(validate('(/!&"#(')).toBe(message);
    });

    it('rejects invalid value type', () => {
        [0, [], {}, true, null, undefined].forEach((value, index) => {
            expect(validate(value)).toEqual(INVALID_TYPE);
            expect(console.error).toHaveBeenCalledTimes(index + 1);
        });
    });
});
