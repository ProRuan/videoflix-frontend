import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { autocompletes, types } from '../../ts/enums';
import { BaseInput } from '../../models/base-input';

@Component({
  selector: 'app-password-input',
  imports: [],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
})
export class PasswordInput extends BaseInput {
  override possibleErrors: string[] = [
    'required',
    'forbidden',
    'minLength',
    'upperCase',
    'lowerCase',
    'digit',
    'specialChar',
    'maxLength',
  ];

  // fix error and match error ...
  //   --> fix border-color and error text (0/2) ...

  @Input() control!: AbstractControl<any, any> | null;
  @Input() placeholder: string = 'Password';
  @Input() autocomplete: string = autocompletes.newPassword;
  @Input('error') matchError: boolean = false;

  @ViewChild('password') input!: ElementRef<HTMLInputElement>;

  isType = signal('password');
  masked: boolean = true;

  onMaskToggle() {
    const value = this.toggleType(this.isType());
    this.isType.set(value);
    this.masked = !this.masked;
  }

  toggleType(value: string) {
    return value == types.password ? types.text : types.password;
  }

  isMasked() {
    return this.masked && this.isFilled();
  }
}
