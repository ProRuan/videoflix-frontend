import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

import { emailPatterns, passwordPatterns } from '../constants';
import {
  FormControlValidators as ControlValidators,
  FormGroupValidators as GroupValidators,
} from '../models';

/**
 * Class representing a form validator service.
 */
@Injectable({ providedIn: 'root' })
export class FormValidator {
  static readonly tokenValidators: ValidatorFn[] = [
    ControlValidators.required,
    ControlValidators.token,
  ];

  static readonly emailValidators: ValidatorFn[] = [
    ControlValidators.required,
    ControlValidators.forbidden(emailPatterns.forbidden),
    ControlValidators.minLength(6),
    ControlValidators.email,
    ControlValidators.maxLength(127),
  ];

  static readonly passwordValidators: ValidatorFn[] = [
    ControlValidators.required,
    ControlValidators.forbidden(passwordPatterns.forbidden),
    ControlValidators.minLength(8),
    ControlValidators.hasUppercase,
    ControlValidators.hasLowercase,
    ControlValidators.hasDigit,
    ControlValidators.hasSpecialChar,
    ControlValidators.maxLength(127),
  ];

  static readonly formValidators: ValidatorFn[] = [
    GroupValidators.passwordMatch,
  ];
}
