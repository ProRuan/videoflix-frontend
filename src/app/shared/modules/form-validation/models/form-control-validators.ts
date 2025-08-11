import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { emailPatterns, passwordPatterns } from '../constants';

/**
 * Class representing form control validators.
 */
export class FormControlValidators {
  /**
   * ValidatorFn checking a control value for being non-empty.
   * @returns Validation errors if the control value is empty,
   *          otherwise null.
   */
  static required: ValidatorFn = (control: AbstractControl) => {
    const errors = Validators.required(control);
    return errors ? { required: true } : null;
  };

  /**
   * ValidatorFn checking a control value for its required minimum length.
   * @param min - The required minimum length to set.
   * @returns Validation errors if the control value is too short,
   *          otherwise null.
   */
  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl) => {
      const errors = Validators.minLength(min)(control);
      if (errors === null) return null;
      const requiredLength = errors['minlength'].requiredLength;
      const actualLength = errors['minlength'].actualLength;
      const number = requiredLength - actualLength;
      const value = number.toString();
      return { minLength: { value, number } };
    };
  }

  /**
   * ValidatorFn checking a control value for its allowed maximum length.
   * @param max - The allowed maximum length to set.
   * @returns Validation errors if the control value is too long,
   *          otherwise null.
   */
  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl) => {
      const errors = Validators.maxLength(max)(control);
      if (errors === null) return null;
      const actualLength = errors['maxlength'].actualLength;
      const requiredLength = errors['maxlength'].requiredLength;
      const number = actualLength - requiredLength;
      const value = number.toString();
      return { maxLength: { value, number } };
    };
  }

  /**
   * ValidatorFn checking a control value for including forbidden characters.
   * @param pattern - The forbidden pattern to set.
   * @returns Validation errors if the control value includes
   *          forbidden characters, otherwise null.
   */
  static forbidden(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control?.value as string | null;
      if (value === null) return null;
      const hasForbidden = pattern.test(value);
      if (!hasForbidden) return null;
      const matches = value.match(new RegExp(pattern.source, 'g')) ?? [];
      const chars = Array.from(new Set(matches.map((m) => m.trim())));
      return { forbidden: { value: chars.join(', '), number: chars.length } };
    };
  }

  /**
   * ValidatorFn checking a control value for including a valid email address.
   * @returns Validation errors if the included email address is invalid,
   *          otherwise null.
   */
  static email: ValidatorFn = (control: AbstractControl) => {
    const errors = Validators.pattern(emailPatterns.email)(control);
    return errors ? { email: true } : null;
  };

  /**
   * ValidatorFn checking a control value for including an uppercase character.
   * @returns Validation errors if the control value misses
   *          an uppercase character, otherwise null.
   */
  static hasUppercase: ValidatorFn = (control: AbstractControl) => {
    const errors = Validators.pattern(passwordPatterns.uppercase)(control);
    return errors ? { uppercase: true } : null;
  };

  /**
   * ValidatorFn checking a control value for including a lowercase character.
   * @returns Validation errors if the control value misses
   *          a lowercase character, otherwise null.
   */
  static hasLowercase: ValidatorFn = (control: AbstractControl) => {
    const errors = Validators.pattern(passwordPatterns.lowercase)(control);
    return errors ? { lowercase: true } : null;
  };

  /**
   * ValidatorFn checking a control value for including a digit.
   * @returns Validation errors if the control value misses
   *          a digit, otherwise null.
   */
  static hasDigit: ValidatorFn = (control: AbstractControl) => {
    const errors = Validators.pattern(passwordPatterns.digit)(control);
    return errors ? { digit: true } : null;
  };

  /**
   * ValidatorFn checking a control value for including a special char.
   * @returns Validation errors if the control value misses
   *          a special char, otherwise null.
   */
  static hasSpecialChar: ValidatorFn = (control: AbstractControl) => {
    const errors = Validators.pattern(passwordPatterns.specialChar)(control);
    return errors ? { specialChar: true } : null;
  };
}
