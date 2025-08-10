import { StringOrStringFunction } from '../types';

/**
 * Interface representing form group error messages.
 */
export interface FormGroupErrorMessages {
  [key: string]: StringOrStringFunction;
  passwordMismatch: string;
}
