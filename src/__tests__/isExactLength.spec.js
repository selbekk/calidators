import isExactLength from '../isExactLength';

const message = 'fail';
const length = 3;

function Foo(len) {
    this._length = len;
}

Object.defineProperty(Foo.prototype, 'length', {
    get: function length() {
        return this._length;
    },
});

describe('isExactLength validator', () => {
    it('accepts when length is equal to config length', () => {
        expect(isExactLength({ message, length })('lol')).toBe(null);
        expect(isExactLength({ message, length })('0mg')).toBe(null);
        expect(isExactLength({ message, length })('321')).toBe(null);
        expect(isExactLength({ message, length })(['a', 'b', 'c'])).toBe(null);
        expect(isExactLength({ message, length })({ length })).toBe(null);
        expect(
            isExactLength({ message, length })({
                get length() {
                    return length;
                },
            }),
        ).toBe(null);
        expect(isExactLength({ message, length })(new Foo(length))).toBe(null);
    });

    it('rejects when length is longer than config length', () => {
        expect(isExactLength({ message, length })('hi there')).toBe(message);
        expect(isExactLength({ message, length })('ugga bugga')).toBe(message);
        expect(isExactLength({ message, length })('four')).toBe(message);
        expect(isExactLength({ message, length })(['a', 'b', 'c', 'd'])).toBe(
            message,
        );
        expect(isExactLength({ message, length })({ length: 4 })).toBe(message);
        expect(
            isExactLength({ message, length })({
                get length() {
                    return 4;
                },
            }),
        ).toBe(message);
        expect(isExactLength({ message, length })(new Foo(4))).toBe(message);
    });

    it('rejects when length is shorter than config length', () => {
        expect(isExactLength({ message, length })('')).toBe(message);
        expect(isExactLength({ message, length })('hi')).toBe(message);
        expect(isExactLength({ message, length })('yo')).toBe(message);
        expect(isExactLength({ message, length })(' ')).toBe(message);
        expect(isExactLength({ message, length })(['a', 'b'])).toBe(message);
        expect(isExactLength({ message, length })({ length: 2 })).toBe(message);
        expect(
            isExactLength({ message, length })({
                get length() {
                    return 2;
                },
            }),
        ).toBe(message);
        expect(isExactLength({ message, length })(new Foo(2))).toBe(message);
    });

    it('rejects invalid value type', () => {
        expect(isExactLength()(0)).toEqual(expect.any(String));
        expect(isExactLength()({})).toEqual(expect.any(String));
        expect(isExactLength()(true)).toEqual(expect.any(String));
        expect(isExactLength()(null)).toEqual(expect.any(String));
        expect(isExactLength()(undefined)).toEqual(expect.any(String));
    });
});
