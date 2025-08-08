export const formControlErrorMessages = {
  required: 'This field is required.',
  forbiddenChars: (chars: string) =>
    `The following characters are not allowed: ${chars}`,
  minLength: (value: number) => `Please enter ${value} character more.`,
  email: 'Please enter a valid email address.',
  password: 'Password does not meet complexity requirements.',
  uppercase: 'At least one uppercase letter is required.',
  lowercase: 'At least one lowercase letter is required.',
  digit: 'At least one digit is required.',
  specialChar: 'At least one special character is required.',
  maxLength: (value: number) => `Please delete ${value} characters.`,
};
