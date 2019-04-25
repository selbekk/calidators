import { isMinLength } from '..';

const message = 'fail';

describe('isMinLength validator', () => {
    it('accepts when length is longer than config length', () => {
        expect(isMinLength({ message, length: 3 })('hi there')).toBe(null);
        expect(isMinLength({ message, length: 3 })('000')).toBe(null);
        expect(isMinLength({ message, length: 3 })('   ')).toBe(null);
    });
    it('rejects when length is shorter than config length', () => {
        expect(isMinLength({ message, length: 3 })('')).toBe(message);
        expect(isMinLength({ message, length: 3 })('hi')).toBe(message);
        expect(isMinLength({ message, length: 3 })('yo')).toBe(message);
        expect(isMinLength({ message, length: 3 })(' ')).toBe(message);
    });
    it('accepts when length is equal to config length', () => {
        expect(isMinLength({ message, length: 3 })('lol')).toBe(null);
        expect(isMinLength({ message, length: 3 })('0mg')).toBe(null);
        expect(isMinLength({ message, length: 3 })('321')).toBe(null);
    });
});
