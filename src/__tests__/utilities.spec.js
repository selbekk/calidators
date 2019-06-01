import {
    INVALID_TYPE,
    Types,
    getType,
    functionToTag,
    objectToTag,
    typeToString,
    isInvalidType,
    isArray,
    isBoolean,
    isEmptyString,
    isFunction,
    isNil,
    isNull,
    isNumber,
    isObject,
    isObjectLike,
    isUndefined,
    toNumber,
    toString,
} from '../utilities';

const types = [
    Types.array,
    Types.boolean,
    Types.boolean,
    Types.function,
    Types.null,
    Types.number,
    Types.number,
    Types.object,
    Types.object,
    Types.string,
    Types.string,
    Types.undefined,
];
const values = [
    [],
    true,
    new Boolean(), // object wrapper
    () => {},
    null,
    0,
    new Number(), // object wrapper
    {},
    Object.create(null),
    '',
    new String(), // object wrapper
    undefined,
];

describe('getType', () => {
    it('should return value type', () => {
        expect(values.map(getType)).toEqual(types);
    });
});

describe('functionToTag', () => {
    it('should return function as string tag', () => {
        expect(functionToTag(Array)).toEqual(
            'function Array() { [native code] }',
        );
    });
});

describe('objectToTag', () => {
    it('should return object as string tag', () => {
        expect(objectToTag([])).toEqual('[object Array]');
    });
});

describe('typeToString', () => {
    it('should return type as string', () => {
        expect(types.map(typeToString)).toEqual([
            'Array',
            'Boolean',
            'Boolean',
            'Function',
            'Null',
            'Number',
            'Number',
            'Object',
            'Object',
            'String',
            'String',
            'Undefined',
        ]);
    });
});

describe('isInvalidType', () => {
    it('should return null', () => {
        expect(isInvalidType('', [Types.string])).toEqual(null);
    });

    it('should return message', () => {
        expect(isInvalidType(0, [Types.string])).toEqual(INVALID_TYPE);
        expect(isInvalidType(true, [Types.null, Types.number])).toEqual(
            INVALID_TYPE,
        );
        expect(console.error).toHaveBeenCalledTimes(2);
    });
});

describe('isArray', () => {
    it('should return true for arrays', () => {
        const results = values.map(isArray);

        expect(results.filter(Boolean)).toHaveLength(1);
        expect(
            results.indexOf(true) === types.indexOf(Types.array),
        ).toBeTruthy();
    });
});

describe('isBoolean', () => {
    it('should return true for booleans', () => {
        const results = values.map(isBoolean);

        expect(results.filter(Boolean)).toHaveLength(2);
        expect(
            types.every(
                (type, index) => !results[index] || type === Types.boolean,
            ),
        ).toBeTruthy();
    });
});

describe('isEmptyString', () => {
    it('should return true for whitespace strings', () => {
        expect(isEmptyString('')).toBeTruthy();
        expect(isEmptyString(' ')).toBeTruthy();
    });

    it('should return false for contentful strings and other types', () => {
        expect(isEmptyString('foo')).toBeFalsy();
        expect(values.map(isEmptyString).filter(Boolean)).toHaveLength(2);
    });
});

describe('isFunction', () => {
    it('should return true for functions', () => {
        const results = values.map(isFunction);

        expect(results.filter(Boolean)).toHaveLength(1);
        expect(
            results.indexOf(true) === types.indexOf(Types.function),
        ).toBeTruthy();
    });
});

describe('isNil', () => {
    it('should return true for null and undefined', () => {
        const results = values.map(isNil);

        expect(results.filter(Boolean)).toHaveLength(2);
        expect(
            types.every(
                (type, index) =>
                    !results[index] ||
                    type === Types.null ||
                    type === Types.undefined,
            ),
        ).toBeTruthy();
    });
});

describe('isNull', () => {
    it('should return true for null', () => {
        const results = values.map(isNull);

        expect(results.filter(Boolean)).toHaveLength(1);
        expect(
            results.indexOf(true) === types.indexOf(Types.null),
        ).toBeTruthy();
    });
});

describe('isNumber', () => {
    it('should return true for numbers', () => {
        const results = values.map(isNumber);

        expect(results.filter(Boolean)).toHaveLength(2);
        expect(
            types.every(
                (type, index) => !results[index] || type === Types.number,
            ),
        ).toBeTruthy();
    });

    it('should return false for NaN', () => {
        expect(isNumber(NaN)).toBeFalsy();
        expect(isNumber(Number('foo'))).toBeFalsy();
    });
});

describe('isObject', () => {
    it('should return true for objects', () => {
        const results = values.map(isObject);

        expect(results.filter(Boolean)).toHaveLength(2);
        expect(
            types.every(
                (type, index) => !results[index] || type === Types.object,
            ),
        ).toBeTruthy();
    });
});

describe('isObjectLike', () => {
    it('should return true for objects', () => {
        const results = values.map(isObjectLike);

        expect(results.filter(Boolean)).toHaveLength(6);
    });
});

describe('isUndefined', () => {
    it('should return true for undefined', () => {
        const results = values.map(isUndefined);

        expect(results.filter(Boolean)).toHaveLength(1);
        expect(
            results.indexOf(true) === types.indexOf(Types.undefined),
        ).toBeTruthy();
    });
});

describe('toNumber', () => {
    it('should return number or NaN', () => {
        expect(values.map(toNumber)).toEqual([
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
            0,
            0,
            NaN,
            NaN,
            NaN,
            NaN,
            NaN,
        ]);
        expect(toNumber('-1')).toEqual(-1);
        expect(toNumber('10e2')).toEqual(10e2);
    });
});

describe('toString', () => {
    it('should return string', () => {
        expect(values.map(toString)).toEqual([
            '[]',
            'true',
            'false',
            'function () {}',
            'null',
            '0',
            '0',
            '{}',
            '{}',
            '',
            '',
            'undefined',
        ]);
    });
});
