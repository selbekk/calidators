import isEqual from '../isEqual';

const message = 'fail';

describe('isEqual validator', () => {
    it('accepts equal values', () => {
        expect(isEqual({ message, value: 'arnold' })('arnold')).toBe(null);
        expect(isEqual({ message, value: '' })('')).toBe(null);
        expect(
            isEqual({ message, value: 'string with whitespace' })(
                'string with whitespace',
            ),
        ).toBe(null);
        expect(isEqual({ message, value: '123' })('123')).toBe(null);
        expect(isEqual({ message, value: '0' })('0')).toBe(null);
        expect(isEqual({ message, value: '-123' })('-123')).toBe(null);
        expect(isEqual({ message, value: 123 })('123')).toBe(null);
        expect(isEqual({ message, value: 0 })('0')).toBe(null);
        expect(isEqual({ message, value: -123 })('-123')).toBe(null);
        expect(isEqual({ message, value: 'true' })('true')).toBe(null);
        expect(isEqual({ message, value: true })('true')).toBe(null);
        expect(isEqual({ message, value: 'false' })('false')).toBe(null);
        expect(isEqual({ message, value: false })('false')).toBe(null);
        expect(isEqual({ message, value: [] })('[]')).toBe(null);
        expect(isEqual({ message, value: [] })([])).toBe(null);
        expect(isEqual({ message, value: {} })('{}')).toBe(null);
        expect(isEqual({ message, value: {} })({})).toBe(null);
    });

    it('rejects when value is not equal', () => {
        expect(isEqual({ message, value: 'arnold' })('')).toBe(message);
        expect(isEqual({ message, value: 'hi' })('ho')).toBe(message);
        expect(isEqual({ message, value: '  ' })(' ')).toBe(message);
        expect(isEqual({ message, value: '123' })('321')).toBe(message);
        expect(isEqual({ message, value: 123 })('321')).toBe(message);
        expect(isEqual({ message, value: false })('true')).toBe(message);
    });

    it('does not do type conversions when in strict mode', () => {
        expect(isEqual({ message, value: 123, strict: true })('123')).toBe(
            message,
        );
        expect(isEqual({ message, value: true, strict: true })('true')).toBe(
            message,
        );
        expect(isEqual({ message, value: false, strict: true })('false')).toBe(
            message,
        );
        expect(isEqual({ message, value: null, strict: true })('null')).toBe(
            message,
        );
        expect(
            isEqual({ message, value: undefined, strict: true })('undefined'),
        ).toBe(message);
        expect(isEqual({ message, value: [], strict: true })('[]')).toBe(
            message,
        );
        expect(isEqual({ message, value: {}, strict: true })('{}')).toBe(
            message,
        );
    });
});
