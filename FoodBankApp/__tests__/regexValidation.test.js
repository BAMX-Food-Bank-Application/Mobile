import { validateEmail, validatePassword, validateNumbers, validateDate } from '../src/features/Global/utils/regexValidation';

describe('validateEmail', () => {
    it('Should return true for valid email addresses', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('test123@example.com')).toBe(true);
        expect(validateEmail('test+123@example.com')).toBe(true);
        expect(validateEmail('test_123@example.com')).toBe(true);
        expect(validateEmail('test.123@example.com')).toBe(true);
    });

    it('Should return false for invalid email addresses', () => {
        expect(validateEmail('example.com')).toBe(false);
        expect(validateEmail('test@example')).toBe(false);
        expect(validateEmail('test@.com')).toBe(false);
        expect(validateEmail('test@.example.com')).toBe(false);
        expect(validateEmail('test@example..com')).toBe(false);
    });
});

describe('validatePassword', () => {
    it('Should return true for valid passwords', () => {
        expect(validatePassword('Patata123')).toBe(true);
    });
    it('Should return false for invalid passwords', () => {
        expect(validatePassword('patata123')).toBe(false);
        expect(validatePassword('PATATA123')).toBe(false);
        expect(validatePassword('Patata')).toBe(false);
    })
});

describe('validateNumbers', () => {
    it('Should return true for valid numbers', () => {
        expect(validateNumbers('123')).toBe(true);
    });
    it('Should return false for invalid numbers', () => {
        expect(validateNumbers('abc')).toBe(false);
        expect(validateNumbers('abc123')).toBe(false);
        expect(validateNumbers('123abc')).toBe(false);
    })
});

describe('validateDate', () => {
    it('Should return true for valid dates', () => {
        expect(validateDate('01/01/2000')).toBe(true);
    });
    it('Should return false for invalid dates', () => {
        expect(validateDate('01-01-2000')).toBe(false);
        expect(validateDate('01/01/00')).toBe(false);
        expect(validateDate('01/01/20000')).toBe(false);
        expect(validateDate('01/01/200')).toBe(false);
    })
});
