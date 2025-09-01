import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Class representing form group validators.
 *
 * Provides validator functions for form group validation.
 */
export class FormGroupValidators {
  /**
   * ValidatorFn checking two form controls for a value match.
   * @param keyA - The control key A.
   * @param keyB - The control key B.
   * @returns Validation errors if the control values are a mismatch,
   *          otherwise null.
   */
  static matchControls(keyA: string, keyB: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const controlA = group.get(keyA);
      const controlB = group.get(keyB);
      if (!controlA?.valid || !controlB?.valid) return null;
      const valueA = controlA?.value;
      const valueB = controlB?.value;
      return valueA !== valueB ? { valueMismatch: true } : null;
    };
  }

  /**
   * ValidatorFn checking two password controls for a password match.
   * @returns Validation errors if the passwords are a mismatch,
   *          otherwise null.
   */
  static passwordMatch: ValidatorFn = (control: AbstractControl) => {
    const pw = 'password';
    const confPw = 'confirmPassword';
    const errors = FormGroupValidators.matchControls(pw, confPw)(control);
    return errors ? { passwordMismatch: true } : null;
  };
}
