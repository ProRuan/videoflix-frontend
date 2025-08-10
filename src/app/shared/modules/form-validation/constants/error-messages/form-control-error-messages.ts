import { FormControlErrorMessages } from '../../interfaces';

export const formControlErrorMessages: FormControlErrorMessages = {
  required: 'This field is required.',
  forbidden: (value: string, number: number) =>
    `Exclude the following character${getPlural(number)}: ${value}`,
  minLength: (value: string, number: number) =>
    `Enter at least ${value} character${getPlural(number)} more.`,
  email: 'Enter a valid email address.',
  uppercase: 'Include at least one uppercase letter.',
  lowercase: 'Include at least one lowercase letter.',
  digit: 'Include at least one digit.',
  specialChar: 'Include at least one special character.',
  maxLength: (value: string, number: number) =>
    `Remove at least ${value} character${getPlural(number)}.`,
};

/**
 * Get a word`s plural.
 * @param number - The plural indicator.
 * @returns The plural "s".
 */
function getPlural(number: number): string {
  return number !== 1 ? 's' : '';
}
