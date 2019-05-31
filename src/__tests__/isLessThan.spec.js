import isLessThan from '../isLessThan';

const message = 'fail';

describe('isLessThan validator', () => {
    it('accepts when value is less than config value', () => {
        expect(isLessThan({ message, value: 11 })('')).toBe(null);
        expect(isLessThan({ message, value: 1.001 })('1')).toBe(null);
        expect(isLessThan({ message, value: 11 })('10')).toBe(null);
        expect(isLessThan({ message, value: -100 })('-1000')).toBe(null);
        expect(isLessThan({ message, value: '1' })('0')).toBe(null);
        expect(isLessThan({ message, value: 'b' })('a')).toBe(null);
        expect(isLessThan({ message, value: 'b' })(9)).toBe(null);
    });

    it('rejects when value is greater than config value', () => {
        expect(isLessThan({ message, value: 10 })('10.001')).toBe(message);
        expect(isLessThan({ message, value: 10 })('11')).toBe(message);
        expect(isLessThan({ message, value: -1000 })('-100')).toBe(message);
        expect(isLessThan({ message, value: '0' })('0')).toBe(message);
        expect(isLessThan({ message, value: 'a' })('a')).toBe(message);
    });

    it('rejects when value is equal to config value', () => {
        expect(isLessThan({ message, value: -1 })('-1')).toBe(message);
        expect(isLessThan({ message, value: 0 })('0')).toBe(message);
        expect(isLessThan({ message, value: 1.123 })('1.123')).toBe(message);
        expect(isLessThan({ message, value: '0' })('1')).toBe(message);
        expect(isLessThan({ message, value: 'a' })('b')).toBe(message);
        expect(isLessThan({ message, value: 'a' })(99)).toBe(message);
    });

    it('rejects invalid value type', () => {
        expect(isLessThan()([])).toEqual(expect.any(String));
        expect(isLessThan()({})).toEqual(expect.any(String));
        expect(isLessThan()(true)).toEqual(expect.any(String));
        expect(isLessThan()(null)).toEqual(expect.any(String));
        expect(isLessThan()(undefined)).toEqual(expect.any(String));
    });
});
