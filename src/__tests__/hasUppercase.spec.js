import hasUppercase from '../hasUppercase';

const message = 'message';
const validate = hasUppercase({ message });

describe('hasUppercase validator', () => {
    it('accepts the empty string', () => {
        expect(validate('')).toBe(null);
    });
    it('accepts valid string containing uppercase character', () => {
        expect(validate('asdAA#2')).toBe(null);
        expect(validate('6as5AAA')).toBe(null);
        expect(validate('_A_111')).toBe(null);
        expect(validate('Hell0')).toBe(null);
    });
    it('rejects invalid string without uppercase character', () => {
        expect(validate('all lowercase')).toBe(message);
        expect(validate('abcdefgh')).toBe(message);
        expect(validate('123_@@@_bbb')).toBe(message);
        expect(validate('####look25')).toBe(message);
        expect(validate('love lowercase')).toBe(message);
        expect(validate('(/!&"#(')).toBe(message);
    });
});
