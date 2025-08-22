import { StringFunction, StringOrStringFunction } from '../types';

/**
 * Interface representing form control error messages.
 */
export interface FormControlErrorMessages {
  [key: string]: StringOrStringFunction;
  required: string;
  forbidden: StringFunction;
  minLength: StringFunction;
  email: string;
  uppercase: string;
  lowercase: string;
  digit: string;
  specialChar: string;
  token: string;
  maxLength: StringFunction;
}
