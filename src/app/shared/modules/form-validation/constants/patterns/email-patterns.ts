import { digits, letters } from './chars';

const username = `[${letters}${digits}._%+-]+`;
const domain = `[${letters}${digits}.-]+`;
const tld = `[${letters}]{2,}`;

export const emailPatternString = `^${username}@${domain}\\.${tld}$`;

export const emailForbiddenPatternString = `[^${letters}${digits}._%+-@]`;

export const emailPatterns = {
  email: new RegExp(emailPatternString),
  forbidden: new RegExp(emailForbiddenPatternString),
};
