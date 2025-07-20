import { ElementRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';

/**
 * Abstract class representing a base input.
 */
export abstract class BaseInput implements ControlValueAccessor {
  error: string = '';

  abstract get possibleErrors(): string[];
  abstract get control(): AbstractControl | null;
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
    for (const error of this.possibleErrors) {
      if (this.hasError(error)) {
        this.error = this.getError(error);
        break;
      }
    }
  }

  /**
   * Check a control for a specified error.
   * @param error - The error key to be checked.
   * @returns A boolean value.
   */
  hasError(error: string) {
    return !!this.control?.hasError(error);
  }

  /**
   * Get a specified error from a control.
   * @param error - The error key.
   * @returns The error value.
   */
  getError(error: string): string {
    return this.control?.getError(error);
  }

  /**
   * Check an input for an error.
   * @returns A boolean value.
   */
  isError() {
    return this.error ? true : false;
  }

  /**
   * Check an input for the fill state.
   * @returns A boolean value.
   */
  isInputFilled() {
    return this.control?.value.length > 0;
  }
}
