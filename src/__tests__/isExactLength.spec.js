import isExactLength from '../isExactLength';
import { INVALID_TYPE } from '../utilities';

const message = 'fail';
const length = 3;
const validate = isExactLength({ message, length });

function foo(len) {
    return {
        get length() {
            return len;
        },
    };
}

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
        expect(validate('lol')).toBe(null);
        expect(validate('0mg')).toBe(null);
        expect(validate('321')).toBe(null);
        expect(validate(Array(length))).toBe(null);
        expect(validate({ length })).toBe(null);
        expect(validate(foo(length))).toBe(null);
        expect(validate(new Foo(length))).toBe(null);
    });

    it('rejects when length is longer than config length', () => {
        expect(validate('hi there')).toBe(message);
        expect(validate('ugga bugga')).toBe(message);
        expect(validate('four')).toBe(message);
        expect(validate(Array(length + 1))).toBe(message);
        expect(validate({ length: length + 1 })).toBe(message);
        expect(validate(foo(length + 1))).toBe(message);
        expect(validate(new Foo(length + 1))).toBe(message);
    });

    it('rejects when length is shorter than config length', () => {
        expect(validate('')).toBe(message);
        expect(validate('hi')).toBe(message);
        expect(validate('yo')).toBe(message);
        expect(validate(' ')).toBe(message);
        expect(validate(Array(length - 1))).toBe(message);
        expect(validate({ length: length - 1 })).toBe(message);
        expect(validate(foo(length - 1))).toBe(message);
        expect(validate(new Foo(length - 1))).toBe(message);
    });

    it('rejects invalid value type', () => {
        [0, {}, true, null, undefined].forEach((value, index) => {
            expect(validate(value)).toEqual(INVALID_TYPE);
            expect(console.error).toHaveBeenCalledTimes(index + 1);
        });
    });
});
