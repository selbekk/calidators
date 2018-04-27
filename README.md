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

## Validators

Here's the available validators. If you need a new one, feel free to open a
pull request!

#### `isRequired`

Validates that a value is not the empty string

```js
import { isRequired } from 'calidators';

const message = 'Field is required';
isRequired({ message })('') === message;
isRequired({ message })('Some input') === null;
```

#### `isNumber`

Validates that a field only contains numeric characters

```js
import { isNumber } from 'calidators';

const message = 'Field must be a number';
isNumber({ message })('') === null;
isNumber({ message })('123') === null;
isNumber({ message })('123.321') === null;
isNumber({ message })('Not a number') === message;
```

#### `isEqual`

Validates that a value equals a given value. The value is cast to a String,
and then checked for equality with the `===` operator.

```js
import { isEqual } from 'calidators';

const message = "Value must be 'true'";
const value = true;
isEqual({ message, value })('') === null;
isEqual({ message, value })('true') === null;
isEqual({ message, value })('false') === message;
```

#### `isGreaterThan` / `isLessThan`

Validates that a value is greater or less than a given number.

```js
import { isGreaterThan, isLessThan } from 'calidators';

{
    const message = 'Value must be greater than 5';
    const value = 5;
    isGreaterThan({ message, value })('') === null;
    isGreaterThan({ message, value })('6') === null;
    isGreaterThan({ message, value })('5') === message;
}
{
    const message = 'Value must be less than 5';
    const value = 5;
    isLessThan({ message, value })('') === null;
    isLessThan({ message, value })('4') === null;
    isLessThan({ message, value })('5') === message;
}
```

#### `isEmail`

Validates that a value is a potentially valid email address. This is weak on
purpose to save bytes - but it will validate most email address errors.

```js
import { isEmail } from 'calidators';

const message = 'Value must be a valid email';
isEmail({ message })('') === null;
isEmail({ message })('valid@email.com') === null;
isEmail({ message })('not a valid @ email') === message;
```

#### `isRegexMatch`

Validates that a value matches a given regular expression.

```js
import { isRegexMatch } from 'calidators';

const message = 'Filename must end with either .js or .jsx';
const regex = /.jsx?$/;
isRegexMatch({ message, regex })('') === null;
isRegexMatch({ message, regex })('userReducer.js') === null;
isRegexMatch({ message, regex })('App.jsx') === null;
isRegexMatch({ message, regex })('.jsx-files') === message;
isRegexMatch({ message, regex })('just baloney') === message;
```

#### `isWhitelisted`

Validates that a value is present in a provided whitelist. The whitelist must be
an array.

```js
import { isWhitelisted } from 'calidators';

const message = "You're not a bro, bro";
const whitelist = ['Chad', 'Bret'];
isWhitelisted({ message, whitelist })('') === null;
isWhitelisted({ message, whitelist })('Chad') === null;
isWhitelisted({ message, whitelist })('Bret') === null;
isWhitelisted({ message, whitelist })('Ping') === message;
```

#### `isBlacklisted`

Validates that a value is not present in a provided blacklist. The blacklist
must be an array.

```js
import { isBlacklisted } from 'calidators';

const message = "You're too bro-ey, bro";
const blacklist = ['Chad', 'Bret'];

isBlacklisted({ message, blacklist })('') === null;
isBlacklisted({ message, blacklist })('Ping') === null;
isBlacklisted({ message, blacklist })('Chad') === message;
isBlacklisted({ message, blacklist })('Bret') === message;
```

#### `isMinLength`

Validates that an input value is at least a given number of characters long.

```js
import { isMinLength } from 'calidators';

const message = 'Too $hort';

isMinLength({ message, length: 3 })('') === null;
isMinLength({ message, length: 3 })('Pa$$W0rd') === null;
isMinLength({ message, length: 3 })('yo') === message;
isMinLength({ message, length: 3 })('0') === message;
```

#### `isMaxLength`

Validates that an input value is at most a given number of characters long.

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

```js
import { isExactLength } from 'calidators';

const message = 'Too $hort';

isExactLength({ message, length: 3 })('') === null;
isExactLength({ message, length: 3 })('foo') === null;
isExactLength({ message, length: 3 })('ba') === message;
isExactLength({ message, length: 3 })('bazz') === message;
```

## Want to contribute?

I'd love some help! Report bugs, help me document stuff, create new validators
and add new features!
