import { AbstractControl, ValidatorFn } from '@angular/forms';
import { InputValidatorKit } from './input-validator-kit';

type Control = AbstractControl;

/**
 * Class providing validator functions for an input validation.
 * @extends InputValidatorKit
 */
export class InputValidator extends InputValidatorKit {
  /**
   * Validate the filled state of an input.
   * @returns The ValidatorFn.
   */
  required(): ValidatorFn {
    return (control: Control) => this.getRequiredError(control);
  }

  /**
   * Validate the minimum length of an input value.
   * @param minLength - The minimum length.
   * @returns The ValidatorFn.
   */
  minLength(minLength: number): ValidatorFn {
    return (control: Control) => this.getMinLengthError(control, minLength);
  }

  /**
   * Validate the maximum length of an input value.
   * @param maxLength - The maximum length.
   * @returns The ValidatorFn.
   */
  maxLength(maxLength: number): ValidatorFn {
    return (control: Control) => this.getMaxLengthError(control, maxLength);
  }

  /**
   * Validate the existence of forbidden characters within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  forbidden(pattern: RegExp): ValidatorFn {
    return this.getRejectorFn('forbidden', pattern);
  }

  /**
   * Validate the value of an email input.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  email(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('email', pattern);
  }

  /**
   * Validate the existence of upper-case characters within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  upperCase(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('upperCase', pattern);
  }

  /**
   * Validate the existence of lower-case characters within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  lowerCase(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('lowerCase', pattern);
  }

  /**
   * Validate the existence of digits within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  digit(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('digit', pattern);
  }

  /**
   * Validate the existence of special characters within an input value.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  specialChar(pattern: RegExp): ValidatorFn {
    return this.getAcceptorFn('specialChar', pattern);
  }

  /**
   * Validate the match between a password and a matchword.
   * @param password - The password to match.
   * @returns The ValidatorFn.
   */
  matchword(password: string): ValidatorFn {
    let pattern = new RegExp(`^${password}$`);
    return this.getAcceptorFn('matchword', pattern);
  }
}
