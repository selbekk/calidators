import isEmail from '../isEmail';

const message = 'message';
const validate = isEmail({ message });

describe('isEmail validator', () => {
    it('accepts valid email addresses', () => {
        expect(validate('test@test.com')).toBe(null);
        expect(validate('i-am-an@email.com')).toBe(null);
        expect(validate('123@456.no')).toBe(null);
        expect(validate('yolo@swag.ninja')).toBe(null);
        expect(validate('email+address@email.com')).toBe(null);
    });

    it('rejects invalid email addresses', () => {
        expect(validate('')).toBe(message);
        expect(validate('not an email')).toBe(message);
        expect(validate('notevenremotely')).toBe(message);
        expect(validate('@missing.com')).toBe(message);
        expect(validate('still@')).toBe(message);
        expect(validate('1234567890')).toBe(message);
        expect(validate('(/!&"#(')).toBe(message);
    });

    it('rejects invalid value type', () => {
        expect(validate(0)).toEqual(expect.any(String));
        expect(validate([])).toEqual(expect.any(String));
        expect(validate({})).toEqual(expect.any(String));
        expect(validate(true)).toEqual(expect.any(String));
        expect(validate(null)).toEqual(expect.any(String));
        expect(validate(undefined)).toEqual(expect.any(String));
    });
});
