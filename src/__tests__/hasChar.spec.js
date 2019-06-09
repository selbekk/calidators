import hasChar from '../hasChar';
import { INVALID_TYPE } from '../utilities';

const message = 'message';

describe('hasChar validator', () => {
    it('accepts valid value containing char', () => {
        expect(hasChar({ message, char: 'f' })('foo')).toBe(null);
        expect(hasChar({ message, char: 'foo' })('foo')).toBe(null);
        expect(hasChar({ message, char: 1 })(101)).toBe(null);
        expect(hasChar({ message, char: '1' })(101)).toBe(null);
        expect(hasChar({ message, char: 1 })('101')).toBe(null);
        expect(hasChar({ message, char: '1' })('101')).toBe(null);
    });

    it('rejects invalid value without char', () => {
        expect(hasChar({ message, char: 'f' })('')).toBe(message);
        expect(hasChar({ message, char: 'f' })('bar')).toBe(message);
        expect(hasChar({ message, char: 'barn' })('bar')).toBe(message);
        expect(hasChar({ message, char: 9 })(101)).toBe(message);
        expect(hasChar({ message, char: '9' })(101)).toBe(message);
        expect(hasChar({ message, char: 9 })('101')).toBe(message);
        expect(hasChar({ message, char: '9' })('101')).toBe(message);
    });

    it('rejects invalid value type', () => {
        [[], {}, true, null, undefined].forEach((value, index) => {
            expect(hasChar({ message, char: '' })(value)).toEqual(INVALID_TYPE);
            expect(console.error).toHaveBeenCalledTimes(index + 1);
        });
    });
});
