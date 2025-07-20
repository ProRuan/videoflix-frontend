import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidator {
  // think about naming ... !
  // use it for sign-up and reset-password (1/2) ... !

  constructor() {}

  passwordMatch() {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = this.arePasswordsValid(control);
      const mismatched = this.arePasswordsMismatched(control);
      return valid && mismatched ? { passwordMismatch: true } : null;
    };
  }

  private arePasswordsMismatched(control: AbstractControl) {
    const password = this.getControlValue(control, 'password');
    const confirmPassword = this.getControlValue(control, 'confirmPassword');
    return password && confirmPassword && password !== confirmPassword;
  }

  private arePasswordsValid(control: AbstractControl) {
    const passwordValid = this.isControlValid(control, 'password');
    const confirmPasswordValid = this.isControlValid(
      control,
      'confirmPassword'
    );
    return passwordValid && confirmPasswordValid;
  }

  private getControlValue(control: AbstractControl, id: string) {
    return control.get(id)?.value;
  }

  private isControlValid(control: AbstractControl, id: string) {
    return control.get(id)?.valid ?? false;
  }
}
