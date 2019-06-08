import isLessThan from '../isLessThan';
import { INVALID_TYPE } from '../utilities';

const message = 'fail';

describe('isLessThan validator', () => {
    it('accepts when value is less than config value', () => {
        expect(isLessThan({ message, value: 1 })(0)).toBe(null);
    });

    it('rejects when value is equal to config value', () => {
        expect(isLessThan({ message, value: 0 })(0)).toBe(message);
    });

    it('rejects when value is greater than config value', () => {
        expect(isLessThan({ message, value: 0 })(1)).toBe(message);
    });

    it('rejects invalid value type', () => {
        [[], {}, true, null, undefined].forEach((value, index) => {
            expect(isLessThan({ message, value: 1 })(value)).toEqual(
                INVALID_TYPE,
            );
            expect(console.error).toHaveBeenCalledTimes(index + 1);
        });
    });
});
