import { inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ValidatorFn } from '@angular/forms';

import { EmptyObject } from '@shared/interfaces';
import { FormValidator } from '@shared/modules/form-validation';

import {
  EmailForm,
  LoginForm,
  RegistrationForm,
  TokenForm,
} from '../interfaces/forms';

/**
 * Class representing an authentication utils service.
 *
 * Provides form getters and payload getters for authentication forms.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthFormUtils {
  fb = inject(NonNullableFormBuilder);

  /**
   * Get an email form control with default value and validators.
   * @returns The email form control.
   */
  private getEmailControl() {
    return this.getFormControl('', FormValidator.emailValidators);
  }

  /**
   * Get a form control with value and validators.
   * @param value - The value to be set.
   * @param validators - The validators to be set.
   * @returns The form control.
   */
  private getFormControl(value: string, validators: ValidatorFn[]) {
    return this.fb.control(value, { validators: validators });
  }

  /**
   * Get a password form control with default value and validators.
   * @returns The password form control.
   */
  private getPasswordControl() {
    return this.getFormControl('', FormValidator.passwordValidators);
  }

  /**
   * Get a token form control with default value and validators.
   * @returns The token form control.
   */
  private getTokenControl() {
    return this.getFormControl('', FormValidator.tokenValidators);
  }

  /**
   * Get an empty form.
   * @returns The empty form.
   */
  getEmptyForm(): FormGroup<EmptyObject> {
    return this.fb.group({});
  }

  /**
   * Get an email form with email control.
   * @returns The email form.
   */
  getEmailForm(): FormGroup<EmailForm> {
    return this.fb.group({
      email: this.getEmailControl(),
    });
  }

  /**
   * Get a login form with email control and password control.
   * @returns The login form.
   */
  getLoginForm(): FormGroup<LoginForm> {
    return this.fb.group({
      email: this.getEmailControl(),
      password: this.getPasswordControl(),
    });
  }

  /**
   * Get a registration form with email control and two passwords controls.
   * @returns The registration form.
   */
  getRegistrationForm(): FormGroup<RegistrationForm> {
    return this.fb.group(
      {
        email: this.getEmailControl(),
        password: this.getPasswordControl(),
        confirmPassword: this.getPasswordControl(),
      },
      { validators: FormValidator.formValidators }
    );
  }

  /**
   * Get a token form with token control.
   * @returns The token form.
   */
  getTokenForm(): FormGroup<TokenForm> {
    return this.fb.group({
      token: this.getTokenControl(),
    });
  }

  /**
   * Get an empty payload.
   * @returns The empty payload.
   */
  getEmptyPayload() {
    return {};
  }

  /**
   * Get an email payload.
   * @param form - The email form.
   * @returns The email payload.
   */
  getEmailPayload(form: FormGroup<EmailForm>) {
    return { email: this.getControlValue(form, 'email') };
  }

  /**
   * Get a form control value from a form..
   * @param form - The form.
   * @param name - The form control name.
   * @returns The form control value.
   */
  private getControlValue(form: FormGroup, name: string) {
    return form.get(name)?.value ?? '';
  }

  /**
   * Get a login payload.
   * @param form - The login form.
   * @returns The login payload.
   */
  getLoginPayload(form: FormGroup<LoginForm>) {
    return {
      email: this.getControlValue(form, 'email'),
      password: this.getControlValue(form, 'password'),
    };
  }

  /**
   * Get a registration payload.
   * @param form - The registration form.
   * @returns The registration payload.
   */
  getRegistrationPayload(form: FormGroup<RegistrationForm>) {
    return {
      email: this.getControlValue(form, 'email'),
      password: this.getControlValue(form, 'password'),
      repeated_password: this.getControlValue(form, 'confirmPassword'),
    };
  }

  /**
   * Get a token payload.
   * @param form - The token form.
   * @returns The token payload.
   */
  getTokenPayload(form: FormGroup<TokenForm>) {
    return { token: this.getControlValue(form, 'token') };
  }
}
