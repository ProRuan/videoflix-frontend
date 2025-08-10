import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { emailPatterns, passwordPatterns } from '../constants';

/**
 * Class representing form control validators.
 */
export class FormControlValidators {
  /**
   * Checks a control value for being non-empty.
   * @returns Validation errors if the control value is empty,
   *          otherwise null.
   */
  static required: ValidatorFn = (control: AbstractControl) => {
    const errors = Validators.required(control);
    return errors ? { required: true } : null;
  };

  /**
   * Checks a control value for its required minimum length.
   * @param min - The required minimum length to set.
   * @returns Validation errors if the control value is too short,
   *          otherwise null.
   */
  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl) => {
      const fn = Validators.minLength(min);
      const errors = fn(control);
      const actualLength = errors?.['minlength']?.actualLength;
      const requiredLength = errors?.['minlength']?.requiredLength;
      const missingChars = requiredLength - actualLength;
      return errors ? { minLength: missingChars } : null;
    };
  }

  /**
   * Checks a control value for its allowed maximum length.
   * @param max - The allowed maximum length to set.
   * @returns Validation errors if the control value is too long,
   *          otherwise null.
   */
  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl) => {
      const fn = Validators.maxLength(max);
      const errors = fn(control);
      const actualLength = errors?.['maxlength']?.actualLength;
      const requiredLength = errors?.['maxlength']?.requiredLength;
      const overflowChars = actualLength - requiredLength;
      return errors ? { maxLength: overflowChars } : null;
    };
  }

  /**
   * Checks a control value for including forbidden characters.
   * @param pattern - The forbidden chars pattern to set.
   * @returns Validation errors if the control value includes
   *          forbidden characters, otherwise null.
   */
  static forbidden(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value as string;
      if (!value) return null;
      const hasForbidden = pattern.test(value);
      if (hasForbidden) {
        const result = value.match(new RegExp(pattern, 'g'));
        console.log('result: ', result);
        let set = new Set(result);
        console.log('set: ', set);
        let forbiddenChars = [...set].join(', ');
        return { forbidden: forbiddenChars };
      } else {
        return null;
      }
    };
  }

  /**
   * Checks a control value for including a valid email address.
   * @returns Validation errors if the included email address
   *          is invalid, otherwise null.
   */
  static email: ValidatorFn = (control: AbstractControl) => {
    const fn = Validators.pattern(emailPatterns.email);
    const errors = fn(control);
    return errors ? { email: true } : null;
  };

  /**
   * Checks a control value for including an uppercase character.
   * @returns Validation errors if the control value misses
   *          an uppercase character, otherwise null.
   */
  static hasUppercase: ValidatorFn = (control: AbstractControl) => {
    const fn = Validators.pattern(passwordPatterns.uppercase);
    const errors = fn(control);
    return errors ? { uppercase: true } : null;
  };

  /**
   * Checks a control value for including a lowercase character.
   * @returns Validation errors if the control value misses
   *          a lowercase character, otherwise null.
   */
  static hasLowercase: ValidatorFn = (control: AbstractControl) => {
    const fn = Validators.pattern(passwordPatterns.lowercase);
    const errors = fn(control);
    return errors ? { lowercase: true } : null;
  };

  /**
   * Checks a control value for including a digit.
   * @returns Validation errors if the control value misses
   *          a digit, otherwise null.
   */
  static hasDigit: ValidatorFn = (control: AbstractControl) => {
    const fn = Validators.pattern(passwordPatterns.digit);
    const errors = fn(control);
    return errors ? { digit: true } : null;
  };

  /**
   * Checks a control value for including a special char.
   * @returns Validation errors if the control value misses
   *          a special char, otherwise null.
   */
  static hasSpecialChar: ValidatorFn = (control: AbstractControl) => {
    const fn = Validators.pattern(passwordPatterns.specialChar);
    const errors = fn(control);
    return errors ? { specialChar: true } : null;
  };
}
