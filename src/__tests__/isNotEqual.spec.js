import isNotEqual from '../isNotEqual';

const message = 'fail';

describe('isNotEqual validator', () => {
    it('accepts unequal values', () => {
        expect(isNotEqual({ message, value: 'arnold' })('')).toBe(null);
        expect(isNotEqual({ message, value: 'arnold' })('sylvester')).toBe(
            null,
        );
        expect(isNotEqual({ message, value: '' })(' ')).toBe(null);
        expect(
            isNotEqual({ message, value: 'string with whitespace' })(
                'stringwithoutwhitespace',
            ),
        ).toBe(null);
        expect(isNotEqual({ message, value: '123' })('1234')).toBe(null);
        expect(isNotEqual({ message, value: '0' })('01')).toBe(null);
        expect(isNotEqual({ message, value: '-123' })('-1234')).toBe(null);
        expect(isNotEqual({ message, value: 123 })('1234')).toBe(null);
        expect(isNotEqual({ message, value: 0 })('01')).toBe(null);
        expect(isNotEqual({ message, value: -123 })('-1234')).toBe(null);
        expect(isNotEqual({ message, value: 'true' })('false')).toBe(null);
        expect(isNotEqual({ message, value: true })('false')).toBe(null);
        expect(isNotEqual({ message, value: 'false' })('true')).toBe(null);
        expect(isNotEqual({ message, value: false })('true')).toBe(null);
        expect(isNotEqual({ message, value: [] })(['foo'])).toBe(null);
        expect(isNotEqual({ message, value: [true] })([false])).toBe(null);
    });

    it('rejects equal values', () => {
        expect(isNotEqual({ message, value: 'arnold' })('arnold')).toBe(
            message,
        );
        expect(isNotEqual({ message, value: '' })('')).toBe(message);
        expect(
            isNotEqual({ message, value: 'string with whitespace' })(
                'string with whitespace',
            ),
        ).toBe(message);
        expect(isNotEqual({ message, value: '123' })('123')).toBe(message);
        expect(isNotEqual({ message, value: '0' })('0')).toBe(message);
        expect(isNotEqual({ message, value: '-123' })(-123)).toBe(message);
        expect(isNotEqual({ message, value: 123 })(123)).toBe(message);
        expect(isNotEqual({ message, value: 0 })('0')).toBe(message);
        expect(isNotEqual({ message, value: -123 })('-123')).toBe(message);
        expect(isNotEqual({ message, value: 'true' })('true')).toBe(message);
        expect(isNotEqual({ message, value: true })('true')).toBe(message);
        expect(isNotEqual({ message, value: [] })('[]')).toBe(message);
        expect(isNotEqual({ message, value: [] })([])).toBe(message);
        expect(isNotEqual({ message, value: '[]' })([])).toBe(message);
        expect(isNotEqual({ message, value: {} })('{}')).toBe(message);
        expect(isNotEqual({ message, value: {} })({})).toBe(message);
        expect(isNotEqual({ message, value: '{}' })({})).toBe(message);
    });

    it('does not do type conversions when in strict mode', () => {
        expect(isNotEqual({ message, value: 123, strict: true })('123')).toBe(
            null,
        );
        expect(isNotEqual({ message, value: true, strict: true })('true')).toBe(
            null,
        );
        expect(
            isNotEqual({ message, value: false, strict: true })('false'),
        ).toBe(null);
        expect(isNotEqual({ message, value: null, strict: true })('null')).toBe(
            null,
        );
        expect(
            isNotEqual({ message, value: undefined, strict: true })(
                'undefined',
            ),
        ).toBe(null);
        expect(isNotEqual({ message, value: [], strict: true })('[]')).toBe(
            null,
        );
        expect(isNotEqual({ message, value: {}, strict: true })('{}')).toBe(
            null,
        );
    });
});
