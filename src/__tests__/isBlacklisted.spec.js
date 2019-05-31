import isBlacklisted from '../isBlacklisted';

const message = 'fail';
const blacklist = ['yellow', 'green', false, null, 0];

describe('isBlacklisted validator', () => {
    it('accepts when value is not in blacklist', () => {
        expect(isBlacklisted({ message, blacklist })('')).toBe(null);
        expect(isBlacklisted({ message, blacklist })('red')).toBe(null);
        expect(isBlacklisted({ message, blacklist })('blue')).toBe(null);
    });

    it('rejects when value is in blacklist', () => {
        expect(isBlacklisted({ message, blacklist })('yellow')).toBe(message);
        expect(isBlacklisted({ message, blacklist })('false')).toBe(message);
        expect(isBlacklisted({ message, blacklist })('0')).toBe(message);
    });

    it('does not do type conversions when in strict mode', () => {
        expect(
            isBlacklisted({ message, blacklist, strict: true })('false'),
        ).toBe(null);
        expect(isBlacklisted({ message, blacklist, strict: true })('0')).toBe(
            null,
        );
    });
});
