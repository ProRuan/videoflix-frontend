const DIGITS = '0-9';
const UPPER_CASES = 'A-ZÀ-Ÿ';
const LOWER_CASES = 'a-zà-ÿß';
const SPECIAL_CHARS = '!@#$%^&*';

/**
 * Get patterns for emails.
 * @returns The patterns for emails.
 */
function getEmailPatterns() {
  const email = getEmailPattern();
  const forbidden = getEmailForbiddenPattern();
  return { email, forbidden };
}

/**
 * Gets an email pattern.
 * @returns The email pattern.
 */
function getEmailPattern() {
  const userName = getEmailUserNamePattern();
  const domain = getEmailDomainPattern();
  const topLevelDomain = getEmailTopLevelDomainPattern();
  return getPattern(`^${userName}@${domain}\\.${topLevelDomain}$`, 'i');
}

/**
 * Get an user name pattern for emails.
 * @returns The user name pattern for emails.
 */
function getEmailUserNamePattern() {
  return `[${DIGITS}${LOWER_CASES}._%+-]+`;
}

/**
 * Get a domain pattern for emails.
 * @returns The domain pattern for emails.
 */
function getEmailDomainPattern() {
  return `[${DIGITS}${LOWER_CASES}.-]+`;
}

/**
 * Get a top-level-domain pattern for emails.
 * @returns The top-level-domain pattern for emails.
 */
function getEmailTopLevelDomainPattern() {
  return `[${LOWER_CASES}]{2,}`;
}

/**
 * Get a pattern as regular expression.
 * @param pattern - The pattern as string.
 * @param flags - The flags.
 * @returns The pattern as regular expression.
 */
function getPattern(pattern: string, flags?: string) {
  return new RegExp(pattern, flags);
}

/**
 * Get a forbidden pattern for emails.
 * @returns The forbidden pattern for emails.
 */
function getEmailForbiddenPattern() {
  return getPattern(`[^${DIGITS}${LOWER_CASES}._%+-@]`, 'i');
}

export const emailPatterns = getEmailPatterns();

/**
 * Get password patterns.
 * @returns The password patterns.
 */
function getPasswordPatterns() {
  const digit = getLockaheadPattern(DIGITS);
  const upperCase = getLockaheadPattern(UPPER_CASES);
  const lowerCase = getLockaheadPattern(LOWER_CASES);
  const specialChar = getLockaheadPattern(SPECIAL_CHARS);
  const forbidden = getPasswordForbiddenPattern();
  return { digit, upperCase, lowerCase, specialChar, forbidden };
}

/**
 * Get a lockahead pattern as regular expression.
 * @param value - The lockahead pattern as string.
 * @returns The lockahead pattern as regular expression.
 */
function getLockaheadPattern(value: string) {
  return getPattern(`(?=.*[${value}])`);
}

/**
 * Get a forbidden pattern for passwords.
 * @returns The forbidden pattern for passwords.
 */
function getPasswordForbiddenPattern() {
  return getPattern(`[^${DIGITS}${LOWER_CASES}${SPECIAL_CHARS}]`, 'i');
}

export const passwordPatterns = getPasswordPatterns();
