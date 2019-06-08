import warning from 'warning';

export const INVALID_TYPE = 'Invalid type, see console for details.';

const NEGATIVE_REGEXP = /^-/;

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
    }).reduce(
        (type, [key, isType]) =>
            type !== false || !isType(value) ? type : Types[key],
        false,
    );

export const functionToTag = func => Function.prototype.toString.call(func);

export const objectToTag = obj => Object.prototype.toString.call(obj);

export const typeToString = type =>
    isFunction(type)
        ? functionToTag(type).match(/^function (\w+)/)[1]
        : objectToTag(type).match(/^\[object (\w+)/)[1];

export const isInvalidType = (value, validTypes) => {
    const type = getType(value);
    const isValid = validTypes.includes(type);

    warning(
        isValid,
        'Invalid value type "%s", expected value type%s: %s',
        typeToString(type),
        validTypes.length > 1 ? 's' : '',
        validTypes.map(typeToString).join(', '),
    );

    return !isValid && process.env.NODE_ENV !== 'production'
        ? INVALID_TYPE
        : null;
};

export const isArray = value => Array.isArray(value);

export const isBoolean = value =>
    typeof value === 'boolean' ||
    (isObjectLike(value) && objectToTag(value) === '[object Boolean]');

export const isEmptyString = value =>
    isString(value) && value.trim().length === 0;

export const isFunction = value => typeof value === 'function';

export const isNil = value => isNull(value) || isUndefined(value);

export const isNull = value => value === null;

export const isNumber = value =>
    (typeof value === 'number' ||
        (isObjectLike(value) && objectToTag(value) === '[object Number]')) &&
    !isNaN(value);

export const isObject = value => {
    if (!isObjectLike(value) || objectToTag(value) !== '[object Object]') {
        return false;
    }

    const prototype = Object.getPrototypeOf(Object(value));

    if (isNull(prototype)) {
        return true;
    }

    const Ctor =
        Object.prototype.hasOwnProperty.call(prototype, 'constructor') &&
        prototype.constructor;

    return (
        isFunction(Ctor) &&
        Ctor instanceof Ctor &&
        functionToTag(Ctor) === functionToTag(Object)
    );
};

export const isObjectLike = value =>
    !isNull(value) && typeof value === 'object';

export const isString = value =>
    typeof value === 'string' ||
    (isObjectLike(value) && objectToTag(value) === '[object String]');

export const isUndefined = value => value === undefined;

export const toNumber = value =>
    isNumber(value) || (isString(value) && !isEmptyString(value))
        ? Number(value)
        : NaN;

export const toString = value =>
    isArray(value) || isObject(value) ? JSON.stringify(value) : `${value}`;

export const whenValueIs = (
    value,
    { lessThan, equalTo, greaterThan },
    model,
) => {
    if (isNumber(value) || isString(value)) {
        value = `${value}`.trim();
        model = `${model}`.trim();

        const valueIsNegative = NEGATIVE_REGEXP.test(value);
        const modelIsNegative = NEGATIVE_REGEXP.test(model);

        if (valueIsNegative && !modelIsNegative) {
            return lessThan;
        }

        if (!valueIsNegative && modelIsNegative) {
            return greaterThan;
        }

        value = value.replace(NEGATIVE_REGEXP, '');
        model = model.replace(NEGATIVE_REGEXP, '');

        let [valInt, valDec = ''] = value.split('.');
        let [modInt, modDec = ''] = model.split('.');
        const intLength = Math.max(valInt.length, modInt.length);
        const decLength = Math.max(valDec.length, modDec.length);

        valInt = valInt.padStart(intLength, '0');
        modInt = modInt.padStart(intLength, '0');

        valDec = valDec.padEnd(decLength, '0');
        modDec = modDec.padEnd(decLength, '0');

        value = `${valInt}.${valDec}`;
        model = `${modInt}.${modDec}`;

        if (value === model) {
            return equalTo;
        }

        return (valueIsNegative && modelIsNegative
          ? value > model
          : value < model)
            ? lessThan
            : greaterThan;
    }

    return isInvalidType(value, [Types.number, Types.string]);
};
