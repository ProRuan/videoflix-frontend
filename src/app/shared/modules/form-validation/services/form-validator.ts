import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

import { emailPatterns, passwordPatterns } from '../constants';
import { FormControlValidators, FormGroupValidators } from '../models';

/**
 * Class representing a form validator service.
 */
@Injectable({ providedIn: 'root' })
export class FormValidator {
  static readonly emailValidators: ValidatorFn[] = [
    FormControlValidators.required,
    FormControlValidators.forbidden(emailPatterns.forbidden),
    FormControlValidators.minLength(6),
    FormControlValidators.email,
    FormControlValidators.maxLength(128),
  ];

  static readonly passwordValidators: ValidatorFn[] = [
    FormControlValidators.required,
    FormControlValidators.forbidden(passwordPatterns.forbidden),
    FormControlValidators.minLength(8),
    FormControlValidators.hasUppercase,
    FormControlValidators.hasLowercase,
    FormControlValidators.hasDigit,
    FormControlValidators.hasSpecialChar,
    FormControlValidators.maxLength(128),
  ];

  static readonly formValidators: ValidatorFn[] = [
    FormGroupValidators.passwordMatch,
  ];
}
