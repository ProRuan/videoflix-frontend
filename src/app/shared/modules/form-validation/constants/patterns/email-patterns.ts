import { DIGITS, LETTERS } from './chars';

const username = `[${LETTERS}${DIGITS}._%+-]+`;
const domain = `[${LETTERS}${DIGITS}.-]+`;
const tld = `[${LETTERS}]{2,}`;

const emailPatternString = `^${username}@${domain}\\.${tld}$`;

const emailForbiddenPatternString = `[^${LETTERS}${DIGITS}._%+-@]`;

export const emailPatterns = {
  email: new RegExp(emailPatternString),
  forbidden: new RegExp(emailForbiddenPatternString),
};
