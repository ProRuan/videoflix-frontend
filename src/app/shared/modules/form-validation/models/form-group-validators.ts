import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { formGroupErrorMessages } from '../constants';

const messages = formGroupErrorMessages;

/**
 * Class representing form group validators.
 */
export class FormGroupValidators {
  /**
   * Checks two form controls for a value match.
   * @param keyA - The control key A.
   * @param keyB - The control key B.
   * @returns Validation errors if the control values mismatch,
   *          otherwise null.
   */
  static matchControls(keyA: string, keyB: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const controlA = form.get(keyA);
      const controlB = form.get(keyB);
      if (!controlA?.valid || !controlB?.valid) return null;
      const valueA = controlA.value;
      const valueB = controlB.value;
      return valueA !== valueB ? { valueMismatch: { keyA, keyB } } : null;
    };
  }

  /**
   * Checks two password controls for a password match.
   * @returns Validation errors if the passwords mismatch,
   *          otherwise null.
   */
  static passwordMatch: ValidatorFn = (control: AbstractControl) => {
    const fn = FormGroupValidators.matchControls('password', 'confirmPassword');
    const errors = fn(control);
    return errors ? { passwordMismatch: true } : null;
  };
}
