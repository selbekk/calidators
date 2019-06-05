import isGreaterThan from '../isGreaterThan';
import { INVALID_TYPE } from '../utilities';

const message = 'fail';

describe('isGreaterThan validator', () => {
    it('accepts when value is greater than config value', () => {
        expect(isGreaterThan({ message, value: 0 })('0.001')).toBe(null);
        expect(isGreaterThan({ message, value: 10 })('10.001')).toBe(null);
        expect(isGreaterThan({ message, value: 10 })('11')).toBe(null);
        expect(isGreaterThan({ message, value: -10 })('0')).toBe(null);
        expect(isGreaterThan({ message, value: -10 })(20)).toBe(null);
        expect(isGreaterThan({ message, value: -10 })('a')).toBe(null);
        expect(isGreaterThan({ message, value: -1000 })('-100')).toBe(null);
        expect(isGreaterThan({ message, value: '0' })('1')).toBe(null);
        expect(isGreaterThan({ message, value: 'a' })('b')).toBe(null);
        expect(isGreaterThan({ message, value: 'a' })(99)).toBe(null);
    });

    it('rejects when value is equal to config value', () => {
        expect(isGreaterThan({ message, value: -1 })('-1')).toBe(message);
        expect(isGreaterThan({ message, value: 0 })('0')).toBe(message);
        expect(isGreaterThan({ message, value: 1.123 })('1.123')).toBe(message);
        expect(isGreaterThan({ message, value: '0' })('0')).toBe(message);
        expect(isGreaterThan({ message, value: 17 })(17)).toBe(message);
        expect(isGreaterThan({ message, value: 'a' })('a')).toBe(message);
    });

    it('rejects when value is less than config value', () => {
        expect(isGreaterThan({ message, value: 0 })('-1')).toBe(message);
        expect(isGreaterThan({ message, value: 0 })('-0.001')).toBe(message);
        expect(isGreaterThan({ message, value: 1.001 })('1')).toBe(message);
        expect(isGreaterThan({ message, value: 11 })('10')).toBe(message);
        expect(isGreaterThan({ message, value: -100 })('-1000')).toBe(message);
        expect(isGreaterThan({ message, value: '1' })('0')).toBe(message);
        expect(isGreaterThan({ message, value: 'b' })('a')).toBe(message);
        expect(isGreaterThan({ message, value: 'b' })(9)).toBe(message);
    });

    it('rejects invalid value type', () => {
        [[], {}, true, null, undefined].forEach((value, index) => {
            expect(isGreaterThan()(value)).toEqual(INVALID_TYPE);
            expect(console.error).toHaveBeenCalledTimes(index + 1);
        });
    });
});
