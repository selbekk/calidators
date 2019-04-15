import isNotEqual from '../isNotEqual';

const message = 'fail';

describe('isNotEqual validator', () => {
    it('accepts the empty string', () => {
        expect(isNotEqual({ message, value: 'arnold' })('')).toBe(null);
    });
    it('accepts not equal strings', () => {
        expect(isNotEqual({ message, value: 'arnold' })('sylvester')).toBe(
            null,
        );
        expect(isNotEqual({ message, value: '' })(' ')).toBe(null);
        expect(
            isNotEqual({ message, value: 'string with whitespace' })(
                'stringwithoutwhitespace',
            ),
        ).toBe(null);
    });

    it('accepts inequal numbers', () => {
        expect(isNotEqual({ message, value: '123' })('1234')).toBe(null);
        expect(isNotEqual({ message, value: '0' })('01')).toBe(null);
        expect(isNotEqual({ message, value: '-123' })('-1234')).toBe(null);
        expect(isNotEqual({ message, value: 123 })('1234')).toBe(null);
        expect(isNotEqual({ message, value: 0 })('01')).toBe(null);
        expect(isNotEqual({ message, value: -123 })('-1234')).toBe(null);
    });

    it('accepts inequal booleans', () => {
        expect(isNotEqual({ message, value: 'true' })('false')).toBe(null);
        expect(isNotEqual({ message, value: true })('false')).toBe(null);
        expect(isNotEqual({ message, value: 'false' })('true')).toBe(null);
        expect(isNotEqual({ message, value: false })('true')).toBe(null);
    });

    it('rejects when value is equal', () => {
        expect(isNotEqual({ message, value: 'hi' })('hi')).toBe(message);
        expect(isNotEqual({ message, value: '  ' })('  ')).toBe(message);
        expect(isNotEqual({ message, value: '123' })('123')).toBe(message);
        expect(isNotEqual({ message, value: 123 })('123')).toBe(message);
        expect(isNotEqual({ message, value: false })('false')).toBe(message);
    });
});
