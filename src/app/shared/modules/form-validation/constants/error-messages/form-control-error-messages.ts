import { FormControlErrorMessages } from '../../interfaces';

export const formControlErrorMessages: FormControlErrorMessages = {
  required: 'This field is required.',
  forbidden: (value: string) => `Exclude the following character(s): ${value}`,
  minLength: (value: string) => `Enter ${value} character(s) more.`,
  email: 'Enter a valid email address.',
  uppercase: 'Include at least one uppercase letter.',
  lowercase: 'Include at least one lowercase letter.',
  digit: 'Include at least one digit.',
  specialChar: 'Include at least one special character.',
  maxLength: (value: string) => `Remove ${value} character(s).`,
};
