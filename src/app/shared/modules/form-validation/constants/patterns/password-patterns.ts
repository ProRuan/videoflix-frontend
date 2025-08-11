import { DIGITS, LETTERS, LOWERCASES, UPPERCASES } from './chars';

export const SPECIALS = '!@#$%^&*';

const uppercasePatternString = `(?=.*[${UPPERCASES}])`;
const lowercasePatternString = `(?=.*[${LOWERCASES}])`;
const digitPatternString = `(?=.*[${DIGITS}])`;
const specialCharPatternString = `(?=.*[${SPECIALS}])`;

const passwordForbiddenPatternString = `[^${LETTERS}${DIGITS}${SPECIALS}]`;

export const passwordPatterns = {
  uppercase: new RegExp(uppercasePatternString),
  lowercase: new RegExp(lowercasePatternString),
  digit: new RegExp(digitPatternString),
  specialChar: new RegExp(specialCharPatternString),
  forbidden: new RegExp(passwordForbiddenPatternString),
};
