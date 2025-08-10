import { digits, letters } from './chars';

const username = `[${letters}${digits}._%+-]+`;
const domain = `[${letters}${digits}.-]+`;
const tld = `[${letters}]{2,}`;

const emailPatternString = `^${username}@${domain}\\.${tld}$`;

const emailForbiddenPatternString = `[^${letters}${digits}._%+-@]`;

export const emailPatterns = {
  email: new RegExp(emailPatternString),
  forbidden: new RegExp(emailForbiddenPatternString),
};
