import isRequired from '../isRequired';

const message = 'fail';
const validate = isRequired({ message });

describe('isRequired validator', () => {
    it('accepts when value is not empty', () => {
        expect(validate('a value')).toBe(null);
        expect(validate('0')).toBe(null);
        expect(validate(0)).toBe(null);
        expect(validate(true)).toBe(null);
        expect(validate(false)).toBe(null);
        expect(validate([])).toBe(null);
        expect(validate({})).toBe(null);
    });

    it('rejects when value is empty', () => {
        expect(validate('')).toBe(message);
        expect(validate(' ')).toBe(message);
        expect(validate(null)).toBe(message);
        expect(validate(undefined)).toBe(message);
    });
});
