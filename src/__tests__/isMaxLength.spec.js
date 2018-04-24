import { isMaxLength } from '..';

const message = 'fail';

describe('isMaxLength validator', () => {
    it('accepts the empty string', () => {
        expect(isMaxLength({ message, length: 3 })('')).toBe(null);
    });
    it('rejects when length is longer than config length', () => {
        expect(isMaxLength({ message, length: 3 })('hi there')).toBe(message);
        expect(isMaxLength({ message, length: 3 })('ugga bugga')).toBe(message);
        expect(isMaxLength({ message, length: 3 })('four')).toBe(message);
    });
    it('accepts when length is shorter than config length', () => {
        expect(isMaxLength({ message, length: 3 })('hi')).toBe(null);
        expect(isMaxLength({ message, length: 3 })('yo')).toBe(null);
        expect(isMaxLength({ message, length: 3 })(' ')).toBe(null);
    });
    it('accepts when length is equal to config length', () => {
        expect(isMaxLength({ message, length: 3 })('lol')).toBe(null);
        expect(isMaxLength({ message, length: 3 })('0mg')).toBe(null);
        expect(isMaxLength({ message, length: 3 })('321')).toBe(null);
    });
});
