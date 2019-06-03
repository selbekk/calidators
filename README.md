# calidators

Red hot JavaScript validators 🌶

[![Build Status](https://travis-ci.org/selbekk/calidators.svg?branch=master)](https://travis-ci.org/selbekk/calidators) [![codecov](https://codecov.io/gh/selbekk/calidators/branch/master/graph/badge.svg)](https://codecov.io/gh/selbekk/calidators)

```
yarn add calidators
```

## What's this?

This is a set of validators implemented in JavaScript. They are the validators
backing the [`calidation`](https://github.com/selbekk/calidation) React form
validation library. You can, however, use them whichever way you want!

## How do you even?

You can import validators like this:

```js
import * as allOfTheValidators from 'calidators';
```

However, I suggest you import only the ones you need, so that it's easier for
your bundler to tree-shake dead code:

```js
import { isRequired, isEqual } from 'calidators';
```

Each validator is a curried function that first accepts a configuration, and
then the value. The configuration is an object with a `message` field and an
optional extra field that depends on the validator.

If the validator fails, it returns the `message` field. If the validator passes,
it returns `null`.

Here's an example where I - very step by step - check the content of a field:

```js
import { isRequired } from 'calidators';

const fieldValue = document.querySelector('#first-name').value;
const config = { message: 'You have to give us your first name!' };
const configuredValidator = isRequired(config);
const errorMessage = configuredValidator(fieldValue);
if (errorMessage) console.error(errorMessage);
```

Here's another example where I validate that the input is at least 5 (in a bit
terser way):

```js
import { isGreaterThan } from 'calidators';

const ageFieldValue = document.querySelector('#age').value;
const errorMessage = isGreaterThan({
    message: 'Your age is important to us',
    value: 5,
})(ageFieldValue);
if (errorMessage) console.error(errorMessage);
```

Does this look pretty straight forward? If not, please submit an issue with your
question, and I'll both answer your question and improve this README for future
users.

## Migration Guide

With the release of `Calidators@3.0.0`, there's a breaking change that you'll want to be aware of.
It was previously established that validators would not run against empty string values. However,
a change within the sibling library Calidation has introduced the possibility of non-string value types!

To simplify things, Calidation now determines whether a field is optional or required and which
validators to run. And each validator simply determines if the input value meets the test requirements.

If you're using `Calidation <= 1.15.1`, you should be using `Calidators <= 2.1.0`

If you're using `Calidation >= 1.16.0`, you should be using `Calidators >= 3.0.0`

If you're not using Calidation, but are using Calidators, you may want to do a similar check within
your own implementation:

```js
import * as Calidators from 'calidators';

// if the field is optional and the value doesn't pass the isRequired validator, skip all validators
if (!(!fieldValidators.isRequired && Calidators.isRequired()(value) !== null)) {
    // Run fieldValidators
}
```

## Validators

Here's the available validators. If you need a new one, feel free to open a
pull request!

#### `isRequired`

Validates that a value is not an empty string, null or undefined.

Validates against all value types.

```js
import { isRequired } from 'calidators';

const message = 'Field is required';

isRequired({ message })('') === message;
isRequired({ message })(' ') === message;
isRequired({ message })(null) === message;
isRequired({ message })(undefined) === message;
isRequired({ message })('Some input') === null;
```

#### `isNumber`

Validates that a field only contains numeric characters.

Validates against all value types.

An optional strict parameter disallows type conversion.

```js
import { isNumber } from 'calidators';

const message = 'Field must be a number';
const strict = true;

isNumber({ message })('123') === null;
isNumber({ message })('123.321') === null;
isNumber({ message, strict })(123) === null;
isNumber({ message })('') === message;
isNumber({ message })('Not a number') === message;
isNumber({ message, strict })('123') === message;
```

#### `isEqual`

Validates that a value equals a given value. The value is cast to a String,
and then checked for equality with the `===` operator.

Validates against all value types.

An optional strict parameter checks type first.

```js
import { isEqual } from 'calidators';

const message = "Value must be 'true'";
const value = true;
const strict = true;

isEqual({ message, value })('true') === null;
isEqual({ message, value, strict })(true) === null;
isEqual({ message, value })('') === message;
isEqual({ message, value })('false') === message;
isEqual({ message, value, strict })('true') === message;
```

#### `isNotEqual`

Validates that a value does not equal a given value. The value is cast to a String,
and then checked for equality with the `===` operator.

Validates against all value types.

An optional strict parameter checks type first.

```js
import { isNotEqual } from 'calidators';

const message = "Value must not be 'true'";
const value = true;
const strict = true;

isNotEqual({ message, value })('false') === null;
isNotEqual({ message, value, strict })('true') === null;
isNotEqual({ message, value })('') === message;
isNotEqual({ message, value })('true') === message;
isNotEqual({ message, value, strict })(true) === message;
```

#### `isGreaterThan` / `isLessThan`

Validates that a value is greater or less than a given value.

Validates against numbers and strings only.

```js
import { isGreaterThan, isLessThan } from 'calidators';

{
    const message = 'Value must be greater than 5';
    const value = 5;

    isGreaterThan({ message, value })(6) === null;
    isGreaterThan({ message, value })('6') === null;
    isGreaterThan({ message, value })('') === message;
    isGreaterThan({ message, value })(5) === message;
    isGreaterThan({ message, value })('5') === message;
}
{
    const message = 'Value must be less than 5';
    const value = 5;

    isLessThan({ message, value })('') === null;
    isLessThan({ message, value })(4) === null;
    isLessThan({ message, value })('4') === null;
    isLessThan({ message, value })(5) === message;
    isLessThan({ message, value })('5') === message;
}
```

#### `isEmail`

Validates that a value is a potentially valid email address. This uses the same
validation logic as browsers do when they see an input with `type="email"`.

Validates against strings only.

```js
import { isEmail } from 'calidators';

const message = 'Value must be a valid email';

isEmail({ message })('valid@email.com') === null;
isEmail({ message })('') === message;
isEmail({ message })('not a valid @ email') === message;
```

#### `isRegexMatch`

Validates that a value matches a given regular expression.

Validates against strings only.

```js
import { isRegexMatch } from 'calidators';

const message = 'Filename must end with either .js or .jsx';
const regex = /.jsx?$/;

isRegexMatch({ message, regex })('userReducer.js') === null;
isRegexMatch({ message, regex })('App.jsx') === null;
isRegexMatch({ message, regex })('') === message;
isRegexMatch({ message, regex })('.jsx-files') === message;
isRegexMatch({ message, regex })('just baloney') === message;
```

#### `isWhitelisted`

Validates that a value is present in a provided whitelist. The whitelist must be
an array. The value is cast to a String (unless in strict mode), and then checked
for equality with the `whitelist.includes(value)` method.

Validates against all values types.

An optional strict parameter disallows type conversion.

```js
import { isWhitelisted } from 'calidators';

const message = "You're not a bro, bro";
const whitelist = ['Chad', 'Bret', true, { foo: 'bar' }];
const strict = true;

isWhitelisted({ message, whitelist })('Chad') === null;
isWhitelisted({ message, whitelist })('Bret') === null;
isWhitelisted({ message, whitelist })('true') === null;
isWhitelisted({ message, whitelist })('{"foo":"bar"}') === null;
isWhitelisted({ message, whitelist, strict })(true) === null;
isWhitelisted({ message, whitelist })('') === message;
isWhitelisted({ message, whitelist })('Ping') === message;
isWhitelisted({ message, whitelist, strict })('true') === message;
```

#### `isBlacklisted`

Validates that a value is not present in a provided blacklist. The blacklist must be
an array. The value is cast to a String (unless in strict mode), and then checked
for equality with the `blacklist.includes(value)` method.

Validates against all values types.

An optional strict parameter disallows type conversion.

```js
import { isBlacklisted } from 'calidators';

const message = "You're too bro-ey, bro";
const blacklist = ['Chad', 'Bret', true, { foo: 'bar' }];
const strict = true;

isBlacklisted({ message, blacklist })('') === null;
isBlacklisted({ message, blacklist })('Ping') === null;
isWhitelisted({ message, whitelist, strict })('true') === null;
isBlacklisted({ message, blacklist })('Chad') === message;
isBlacklisted({ message, blacklist })('Bret') === message;
isWhitelisted({ message, whitelist })('true') === message;
isWhitelisted({ message, whitelist, strict })(true) === message;
```

#### `isMinLength`

Validates that an input value is at least a given number of characters long.

Validates against arrays, strings and objects with a length.

```js
import { isMinLength } from 'calidators';

const message = 'Too $hort';

isMinLength({ message, length: 3 })('') === message;
isMinLength({ message, length: 3 })('Pa$$W0rd') === null;
isMinLength({ message, length: 3 })('yo') === message;
isMinLength({ message, length: 3 })('0') === message;
```

#### `isMaxLength`

Validates that an input value is at most a given number of characters long.

Validates against arrays, strings and objects with a length.

```js
import { isMaxLength } from 'calidators';

const message = 'Too $hort';

isMaxLength({ message, length: 3 })('') === null;
isMaxLength({ message, length: 3 })('0') === null;
isMaxLength({ message, length: 3 })('fin') === null;
isMaxLength({ message, length: 3 })('test') === message;
```

#### `isExactLength`

Validates that an input value is exactly a given number of characters long.

Validates against arrays, strings and objects with a length.

```js
import { isExactLength } from 'calidators';

const message = 'Too $hort';

isExactLength({ message, length: 3 })('') === message;
isExactLength({ message, length: 3 })('foo') === null;
isExactLength({ message, length: 3 })('ba') === message;
isExactLength({ message, length: 3 })('bazz') === message;
```

#### `hasChar`

Validates that a value contains at the provide character (or string).

Validates against numbers and strings only.

```js
import { hasChar } from 'calidators';

const message = 'Value must contain character';

hasChar({ message, char: 'm' })('Hello, I am 12') === null;
hasChar({ message, char: 12 })('Hello, I am 12') === null;
hasChar({ message, char: 'Q' })('') === message;
hasChar({ message, char: 'High' })('Hi') === message;
hasChar({ message, char: 7 })('123') === message;
```

#### `hasDigit`

Validates that a value contains at least one digit.

Validates against numbers and strings only.

```js
import { hasDigit } from 'calidators';

const message = 'Value must have at least one digit';

hasDigit({ message })(8900) === null;
hasDigit({ message })('Hello, I am 12') === null;
hasDigit({ message })('') === message;
hasDigit({ message })('Hi') === message;
```

#### `hasUppercase`

Validates that a value contains at least one uppercase character.

Validates against strings only.

```js
import { hasUppercase } from 'calidators';

const message = 'Value must contain at least one uppercase character';

hasUppercase({ message })('') === message;
hasUppercase({ message })('Hello, John') === null;
hasUppercase({ message })('no uppercase here') === message;
```

#### `hasLowercase`

Validates that a value contains at least one lowercase character.

Validates against strings only.

```js
import { hasLowercase } from 'calidators';

const message = 'Value must contain at least one lowercase character';

hasLowercase({ message })('') === message;
hasLowercase({ message })('Hello, John') === null;
hasLowercase({ message })('SCREAM UPPERCASE') === message;
```

## Want to contribute?

I'd love some help! Report bugs, help me document stuff, create new validators
and add new features!
