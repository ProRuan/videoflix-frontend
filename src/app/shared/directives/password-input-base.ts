import { Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { InputBase } from './input-base';
import { Autocompletes, InputErrors, Types } from 'shared/ts/enums';

/**
 * Class representing a password input base directive.
 *
 * Provides common properties for password inputs.
 *
 * @extends InputBase
 */
@Directive()
export class PasswordInputBase extends InputBase {
  possibleErrors: string[] = [
    InputErrors.Required,
    InputErrors.Forbidden,
    InputErrors.MinLength,
    InputErrors.UpperCase,
    InputErrors.LowerCase,
    InputErrors.Digit,
    InputErrors.SpecialChar,
    InputErrors.MaxLength,
  ];

  masked: boolean = true;

  @Input() placeholder: string = 'Password';
  @Input() autocomplete: string = Autocompletes.NewPassword;
  @Input('error') matchError: boolean = false;
  @Input('errorDisplayed') matchErrorDisplayed: boolean = true;

  @ViewChild('password') input!: ElementRef<HTMLInputElement>;

  /**
   * Check a password input for the masked state.
   * @returns A boolean value.
   */
  isMasked() {
    return this.masked && this.isInputFilled();
  }

  /**
   * Check a password input for invalidity.
   * @returns A boolean value.
   */
  isInvalid() {
    return this.isError() || this.matchError;
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
   * @returns A boolean value.
   */
  isPasswordError() {
    return this.isError() || this.isMatchError();
  }

  /**
   * Check a password input for a match error.
   * @returns A boolean value.
   */
  isMatchError() {
    return this.matchError && this.matchErrorDisplayed;
  }
}
