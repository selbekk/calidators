import hasChar from '../hasChar';

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
        expect(hasChar()([])).toEqual(expect.any(String));
        expect(hasChar()({})).toEqual(expect.any(String));
        expect(hasChar()(true)).toEqual(expect.any(String));
        expect(hasChar()(null)).toEqual(expect.any(String));
        expect(hasChar()(undefined)).toEqual(expect.any(String));
    });
});
