import isRegexMatch from '../isRegexMatch';
import { INVALID_TYPE } from '../utilities';

const message = 'fail';

describe('isRegexMatch validator', () => {
    it('accepts when the regex matches', () => {
        expect(isRegexMatch({ message, regex: /^\d{4}$/ })('1234')).toBe(null);
        expect(isRegexMatch({ message, regex: /^\d{4}$/ })('4321')).toBe(null);
    });

    it('rejects when the regex does not match', () => {
        expect(isRegexMatch({ message, regex: /^\d{4}$/ })('')).toBe(message);
        expect(isRegexMatch({ message, regex: /^\d{4}$/ })('12345')).toBe(
            message,
        );
        expect(isRegexMatch({ message, regex: /^\d{4}$/ })('not a match')).toBe(
            message,
        );
    });

    it('rejects invalid value type', () => {
        [0, [], {}, true, null, undefined].forEach((value, index) => {
            expect(isRegexMatch()(value)).toEqual(INVALID_TYPE);
            expect(console.error).toHaveBeenCalledTimes(index + 1);
        });
    });
});
