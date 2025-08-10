import { StringOrStringFunction } from "../types"; 

/**
 * Interface representing form control error messages.
 */
export interface FormControlErrorMessages {
  [key: string]: StringOrStringFunction;
  required: string;
  forbidden: (value: string) => string;
  minLength: (value: string) => string;
  email: string;
  uppercase: string;
  lowercase: string;
  digit: string;
  specialChar: string;
  maxLength: (value: string) => string;
}
