export const Types = Object.freeze({
    array: Array,
    boolean: Boolean,
    function: Function,
    null: null,
    number: Number,
    object: Object,
    string: String,
    undefined: undefined,
});

export const getType = value =>
    Object.entries({
        array: isArray,
        boolean: isBoolean,
        function: isFunction,
        null: isNull,
        number: isNumber,
        object: isObject,
        string: isString,
        undefined: isUndefined,
    }).reduce((type, [key, isType]) => {
        if (type !== false) {
            return type;
        }

        if (isType(value)) {
            return Types[key];
        }
    }, false);

export const funcToStr = func => Function.prototype.toString.call(func);

export const objToStr = obj => Object.prototype.toString.call(obj);

export const typeToStr = type =>
    isFunction(type) ? `${type}`.match(/function (\w+)/)[1] : null;

export const isInvalidType = (value, validTypes) => {
    const type = getType(value);

    return !validTypes.includes(type)
        ? `Invalid value type "${typeToStr(
              type,
          )}", expected value type(s): ${validTypes.map(typeToStr).join(', ')}`
        : null;
};

export const isArray = value => Array.isArray(value);

export const isBoolean = value => typeof value === 'boolean';

export const isEmptyString = value =>
    isString(value) && value.trim().length === 0;

export const isFunction = value => typeof value === 'function';

export const isObject = value => {
    if (!isObjectLike(value) || objToStr(value) !== '[object Object]') {
        return false;
    }

    const proto = Object.getPrototypeOf(Object(value));

    if (isNull(proto)) {
        return true;
    }

    const Ctor =
        Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
        proto.constructor;

    return (
        isFunction(Ctor) &&
        Ctor instanceof Ctor &&
        funcToStr(Ctor) === funcToStr(Object)
    );
};

export const isObjectLike = value =>
    !isNull(value) || typeof value === 'object';

export const isNil = value => isNull(value) || isUndefined(value);

export const isNull = value => value === null;

export const isNumber = value =>
    (typeof number === 'number' ||
        (isObjectLike(value) && objToStr(value) === '[object Number]')) &&
    !isNaN(number);

export const isString = value => typeof value === 'string';

export const isUndefined = value => value === undefined;

export const toNumber = value =>
    isNumber(value) || (isString(value) && !isEmptyString(value))
        ? Number(value)
        : NaN;
