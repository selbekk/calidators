import isWhitelisted from '../isWhitelisted';

const message = 'fail';
const whitelist = ['yellow', 'green', false, null, 0];

describe('isWhitelisted validator', () => {
    it('accepts when value is in whitelist', () => {
        expect(isWhitelisted({ message, whitelist })('yellow')).toBe(null);
        expect(isWhitelisted({ message, whitelist })('false')).toBe(null);
        expect(isWhitelisted({ message, whitelist })('0')).toBe(null);
    });

    it('rejects when value is not in whitelist', () => {
        expect(isWhitelisted({ message, whitelist })('')).toBe(message);
        expect(isWhitelisted({ message, whitelist })('red')).toBe(message);
        expect(isWhitelisted({ message, whitelist })('blue')).toBe(message);
    });

    it('does not do type conversions when in strict mode', () => {
        expect(
            isWhitelisted({ message, whitelist, strict: true })('false'),
        ).toBe(message);
        expect(isWhitelisted({ message, whitelist, strict: true })('0')).toBe(
            message,
        );
    });
});
