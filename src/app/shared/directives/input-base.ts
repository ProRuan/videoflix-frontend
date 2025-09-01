import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';

import {
  ErrorMessageParams,
  formControlErrorMessages,
} from '@shared/modules/form-validation';

const errorMessages = formControlErrorMessages;

/**
 * Abstract class representing an input base directive.
 *
 * Provides properties and methods for input validation.
 *
 * @extends InputBase
 *
 * @implements {ControlValueAccessor}
 */
@Directive()
export abstract class InputBase implements ControlValueAccessor {
  error: string = '';

  @Input() control: AbstractControl | null = null;
  @Input() readOnly: boolean = false;
  @Input() errorsVisible: boolean = true;

  abstract get possibleErrorKeys(): string[];
  abstract get input(): ElementRef<HTMLInputElement>;

  /**
   * Write an input value into a control value.
   */
  writeValue(): void {
    const value = this.input.nativeElement.value;
    this.control?.setValue(value);
  }

  /**
   * Register a function to be called on change.
   * @param fn - The function to be registered.
   */
  registerOnChange(fn: any): void {}

  /**
   * Register a function to be called on touched.
   * @param fn - The function to be registered.
   */
  registerOnTouched(fn: any): void {}

  /**
   * Write and validate an input value.
   */
  onInput() {
    this.writeValue();
    this.validateValue();
  }

  /**
   * Check a control value for possible errors.
   */
  validateValue() {
    this.error = '';
    for (const key of this.possibleErrorKeys) {
      if (!this.hasError(key)) continue;
      this.error = this.getErrorMessage(key);
      break;
    }
  }

  /**
   * Check a control for a specified error.
   * @param error - The error key to be checked.
   * @returns True if the control has an error, otherwise false.
   */
  hasError(error: string) {
    return !!this.control?.hasError(error);
  }

  /**
   * Get an error message.
   * @param key - The error key.
   * @returns The error message.
   */
  getErrorMessage(key: string) {
    const error = errorMessages[key];
    if (typeof error === 'function') {
      const params = this.getErrorMessageParams(key);
      return error(params.value, params.number);
    } else {
      return error;
    }
  }

  /**
   * Get error message parameters.
   * @param key - The error key.
   * @returns The error message parameters.
   */
  getErrorMessageParams(key: string) {
    return this.getError(key);
  }

  /**
   * Get a specified error from a control.
   * @param error - The error key.
   * @returns The error value.
   */
  getError(error: string): ErrorMessageParams {
    return this.control?.getError(error);
  }

  /**
   * Check an input for an error.
   * @returns True if there is an error, otherwise null.
   */
  isError() {
    return this.errorsVisible && !!this.error;
  }

  /**
   * Check an input for the fill state.
   * @returns True if the input is filled, otherwise false.
   */
  isInputFilled() {
    return this.control?.value?.length > 0;
  }
}
