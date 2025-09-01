import { Directive, ElementRef, Input, ViewChild } from '@angular/core';

import {
  FormControlErrors as ControlErrors,
  InputAutocompletes as Autocompletes,
  InputTypes as Types,
} from '@shared/constants';

import { InputBase } from './input-base';

/**
 * Class representing a password input base directive.
 *
 * Provides properties for password inputs.
 *
 * @extends InputBase
 */
@Directive()
export class PasswordInputBase extends InputBase {
  possibleErrorKeys: string[] = [
    ControlErrors.Required,
    ControlErrors.Forbidden,
    ControlErrors.MinLength,
    ControlErrors.Uppercase,
    ControlErrors.Lowercase,
    ControlErrors.Digit,
    ControlErrors.SpecialChar,
    ControlErrors.MaxLength,
  ];

  masked: boolean = true;

  @Input() placeholder: string = 'Password';
  @Input() autocomplete: string = Autocompletes.NewPassword;
  @Input('error') matchError?: string;
  @Input('errorDisplayed') matchErrorDisplayed: boolean = true;

  @ViewChild('password') input!: ElementRef<HTMLInputElement>;

  /**
   * Get a password error caused by control or match error.
   * @returns The password error.
   */
  get passwordError() {
    return this.matchError ? this.matchError : this.error;
  }

  /**
   * Check a password input for the masked state.
   * @returns True if the input is masked, otherwise false.
   */
  isMasked() {
    return this.masked && this.isInputFilled();
  }

  /**
   * Check a password input for invalidity.
   * @returns True if the input is invalid, otherwise false.
   */
  isInvalid() {
    return this.isError() || !!this.matchError;
  }

  /**
   * Get the type of a password input.
   * @returns The type of the password input.
   */
  getType() {
    return this.masked ? Types.Password : Types.Text;
  }

  /**
   * Toggle a password mask on click.
   */
  onMaskToggle() {
    this.masked = !this.masked;
  }

  /**
   * Check a password input for validation error or match error.
   * @returns True if there is a password error, otherwise false.
   */
  isPasswordError() {
    return this.isError() || this.isMatchError();
  }

  /**
   * Check a password input for a match error.
   * @returns True if there is a match error, otherwise false.
   */
  isMatchError() {
    return !!this.matchError && this.matchErrorDisplayed;
  }
}
