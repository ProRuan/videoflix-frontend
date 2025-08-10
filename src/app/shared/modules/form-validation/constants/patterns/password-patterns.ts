import { digits, letters, lowercases, specials, uppercases } from './chars';

const uppercasePatternString = `(?=.*[${uppercases}])`;
const lowercasePatternString = `(?=.*[${lowercases}])`;
const digitPatternString = `(?=.*[${digits}])`;
const specialCharPatternString = `(?=.*[${specials}])`;

const passwordForbiddenPatternString = `[^${letters}${digits}${specials}]`;

export const passwordPatterns = {
  uppercase: new RegExp(uppercasePatternString),
  lowercase: new RegExp(lowercasePatternString),
  digit: new RegExp(digitPatternString),
  specialChar: new RegExp(specialCharPatternString),
  forbidden: new RegExp(passwordForbiddenPatternString),
};
