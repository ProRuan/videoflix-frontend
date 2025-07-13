import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BaseInput } from '../../models/base-input';
import { Autocompletes, InputErrors, Types } from '../../ts/enums';

@Component({
  selector: 'app-password-input',
  imports: [],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
})

/**
 * Class representing a password input component.
 * @extends BaseInput
 */
export class PasswordInput extends BaseInput {
  possibleErrors: string[] = [
    InputErrors.required,
    InputErrors.forbidden,
    InputErrors.minLength,
    InputErrors.upperCase,
    InputErrors.lowerCase,
    InputErrors.digit,
    InputErrors.specialChar,
    InputErrors.maxLength,
  ];

  masked: boolean = true;
  type = signal(Types.password);

  @Input() control!: AbstractControl | null;
  @Input() placeholder: string = 'Password';
  @Input() autocomplete: string = Autocompletes.newPassword;
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
    return this.error || this.matchError;
  }

  /**
   * Toggle a password mask on click.
   */
  onMaskToggle() {
    const changedType = this.getChangedType(this.type());
    this.type.set(changedType);
    this.masked = !this.masked;
  }

  /**
   * Get a changed input type.
   * @param value - The current input type.
   * @returns The changed input type.
   */
  private getChangedType(value: string) {
    return value === Types.password ? Types.text : Types.password;
  }

  /**
   * Check a password input for validation or match error.
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
