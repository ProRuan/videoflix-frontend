import { AbstractControl, ValidatorFn } from '@angular/forms';

type Control = AbstractControl | null;

/**
 * Class providing basic functions for input validators.
 */
export class InputValidatorKit {
  requiredError = { required: 'This field is required' };

  errors: Record<string, string> = {
    forbidden: 'Forbidden character:',
    email: 'Enter a valid email',
    upperCase: 'Use 1+ upper-case characters',
    lowerCase: 'Use 1+ lower-case characters',
    digit: 'Use 1+ digits',
    specialChar: 'Use 1+ special characters',
    matchword: "Your passwords don't match. Please try again.",
  };

  /**
   * Get a required error.
   * @param control - The abstract control.
   * @returns The ValidationErrors or null.
   */
  protected getRequiredError(control: Control) {
    const error = this.requiredError;
    return control?.value?.trim() ? null : error;
  }

  /**
   * Get a minLength error.
   * @param control - The abstract control.
   * @param minLength - The minimum length.
   * @returns The ValidationErrors or null.
   */
  protected getMinLengthError(control: Control, minLength: number) {
    const tooShort = this.isTooShort(control, minLength);
    const error = this.getMinLengthErrorObject(minLength);
    return tooShort ? error : null;
  }

  /**
   * Check if the input value is too short.
   * @param control - The abstract control.
   * @param minLength - The minimum length.
   * @returns A boolean value.
   */
  protected isTooShort(control: Control, minLength: number) {
    return control?.value?.length < minLength;
  }

  /**
   * Get a minLength error object.
   * @param minLength - The minimum length.
   * @returns The minLength error object.
   */
  protected getMinLengthErrorObject(minLength: number) {
    return { minLength: `Use ${minLength}+ characters` };
  }

  /**
   * Get a maxLength error.
   * @param control - The abstract control.
   * @param maxLength - The maximum length.
   * @returns The ValidationErrors or null.
   */
  protected getMaxLengthError(control: Control, maxLength: number) {
    const tooLong = this.isTooLong(control, maxLength);
    const error = this.getMaxLengthErrorObject(maxLength);
    return tooLong ? error : null;
  }

  /**
   * Check if an input value is too long.
   * @param control - The abstract control.
   * @param maxLength - The maximum length.
   * @returns A boolean value.
   */
  protected isTooLong(control: Control, maxLength: Number) {
    return control?.value?.length > maxLength;
  }

  /**
   * Get a maxLength error object.
   * @param maxLength - The maximum length.
   * @returns The maxLength error object.
   */
  protected getMaxLengthErrorObject(maxLength: number) {
    return { maxLength: `Maximum ${maxLength} characters allowed` };
  }

  /**
   * Reject an input value by an excluding pattern.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  protected getRejectorFn(key: string, pattern: RegExp): ValidatorFn {
    return (control: Control) => this.getRejectionError(control, key, pattern);
  }

  /**
   * Throw an error if the excluding pattern matches an input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  protected getRejectionError(control: Control, key: string, pattern: RegExp) {
    const error = this.getError(key, pattern, control);
    return error.pattern.test(control?.value) ? error.value : null;
  }

  /**
   * Get an error.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @param control - The abstract control.
   * @returns The error.
   */
  protected getError(key: string, pattern: RegExp, control?: Control) {
    const char = this.getChar(pattern, control);
    const value = this.getErrorValue(key, char);
    return { pattern, value };
  }

  /**
   * Get a char.
   * @param pattern - The test pattern.
   * @param control - The abstract control.
   * @returns The char.
   */
  protected getChar(pattern: RegExp, control?: Control) {
    return control?.value ? control.value.match(pattern) : '';
  }

  /**
   * Get ValidationErrors.
   * @param key - The error key.
   * @returns The ValidationErrors.
   */
  protected getErrorValue(key: string, char: string) {
    const text = this.getErrorText(key, char);
    return { [key]: text };
  }

  /**
   * Get an error text.
   * @param key - The error key.
   * @param char - The char.
   * @returns The error text.
   */
  protected getErrorText(key: string, char: string) {
    const text = this.errors[key];
    return char ? `${text} "${char}"` : text;
  }

  /**
   * Accept an input value by an including pattern.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidatorFn.
   */
  protected getAcceptorFn(key: string, pattern: RegExp): ValidatorFn {
    return (control: Control) => this.getAcceptionError(control, key, pattern);
  }

  /**
   * Throw an error, if the including pattern mismatches an input value.
   * @param control - The abstract control.
   * @param key - The error key.
   * @param pattern - The test pattern.
   * @returns The ValidationErrors or null.
   */
  protected getAcceptionError(control: Control, key: string, pattern: RegExp) {
    const error = this.getError(key, pattern);
    return pattern.test(control?.value) ? null : error.value;
  }
}
