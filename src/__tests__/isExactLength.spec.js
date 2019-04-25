import { isExactLength } from '..';

const message = 'fail';

describe('isExactLength validator', () => {
    it('accepts when length is equal to config length', () => {
        expect(isExactLength({ message, length: 3 })('lol')).toBe(null);
        expect(isExactLength({ message, length: 3 })('0mg')).toBe(null);
        expect(isExactLength({ message, length: 3 })('321')).toBe(null);
    });
    it('rejects when length is longer than config length', () => {
        expect(isExactLength({ message, length: 3 })('hi there')).toBe(message);
        expect(isExactLength({ message, length: 3 })('ugga bugga')).toBe(
            message,
        );
        expect(isExactLength({ message, length: 3 })('four')).toBe(message);
    });
    it('accepts when length is shorter than config length', () => {
        expect(isExactLength({ message, length: 3 })('')).toBe(message);
        expect(isExactLength({ message, length: 3 })('hi')).toBe(message);
        expect(isExactLength({ message, length: 3 })('yo')).toBe(message);
        expect(isExactLength({ message, length: 3 })(' ')).toBe(message);
    });
});
