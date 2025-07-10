import { ElementRef, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor } from '@angular/forms';

export abstract class BaseInput implements ControlValueAccessor {
  error: string = '';
  possibleErrors: string[] = [
    'required',
    'forbidden',
    'minLength',
    'upperCase',
    'lowerCase',
    'digit',
    'specialChar',
    'maxLength',
  ];

  isError = signal(false);

  abstract get control(): AbstractControl | null;
  abstract get input(): ElementRef<HTMLInputElement>;

  writeValue(): void {
    const value = this.input.nativeElement.value;
    this.control?.setValue(value);
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  onInput() {
    this.writeValue();
    this.validateValue();
    this.showError();
  }

  validateValue() {
    this.updateInputError();
  }

  /**
   * Updates the input error of a control.
   */
  updateInputError() {
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
   * @param error - The error key to check.
   * @returns A boolean value.
   */
  hasError(error: string) {
    return !!this.control?.hasError(error);
  }

  /**
   * Get a specified error from the control.
   * @param error - The error key.
   * @returns The error value.
   */
  getError(error: string): string {
    return this.control?.getError(error);
  }

  showError() {
    const value = this.error ? true : false;
    this.isError.set(value);
  }

  isFilled() {
    return this.control?.value.length;
  }
}
