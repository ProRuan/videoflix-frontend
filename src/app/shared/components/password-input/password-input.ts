import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BaseInput } from '../../models/base-input';
import { Autocompletes, InputErrors, Types } from '../../ts/enums';

@Component({
  selector: 'app-password-input',
  imports: [CommonModule],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
})

/**
 * Class representing a password input component.
 * @extends BaseInput
 */
export class PasswordInput extends BaseInput {
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

  @Input() control!: AbstractControl | null;
  @Input() placeholder: string = 'Password';
  @Input() autocomplete: string = Autocompletes.NewPassword;
  @Input() errorsVisible: boolean = true;
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
