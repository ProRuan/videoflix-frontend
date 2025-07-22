import { Directive, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Authentication } from '../../shared/services/authentication';
import { DialogManager } from '../../shared/services/dialog-manager';
import { ToastManager } from '../../shared/services/toast-manager';
import { DialogIds } from '../../shared/ts/enums';
import { InputValidation } from '../services/input-validation';
import { FormValidator } from '../services/form-validator';
import { Observable } from 'rxjs';

@Directive()
export abstract class AuthForm {
  protected fb = inject(FormBuilder);
  protected validation: InputValidation = inject(InputValidation);
  protected validator: FormValidator = inject(FormValidator);
  protected auth = inject(Authentication);
  protected dialogs = inject(DialogManager);
  protected toasts = inject(ToastManager);

  // appled for sign-up, log-in, forgot-password (3/5) ...

  abstract form: FormGroup;

  protected abstract setForm(): void;

  /** Convert the raw form value into the payload your API expects */
  protected abstract getPayload(): any;

  protected abstract handleSuccess(value?: any): void;

  /**
   * Get the email control of a sign-up form.
   * @returns The email control or null.
   */
  get email() {
    return this.form.get('email');
  }

  /**
   * Get the password control of a sign-up form.
   * @returns The password control or null.
   */
  get password() {
    return this.form.get('password');
  }

  /**
   * Get the confirm-password control of a sign-up form.
   * @returns The confirm-password control or null.
   */
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  /**
   * Get a possible error caused by a password mismatch.
   */
  get matchError() {
    return this.form.hasError('passwordMismatch');
  }

  protected performRequest(fn: () => Observable<any>) {
    fn().subscribe({
      next: (value) => this.handleSuccess(value),
      error: () => this.handleError(),
    });
  }

  protected showSuccessDialog(id: DialogIds) {
    this.form.reset();
    this.toasts.slideOutImmediately();
    this.dialogs.openSuccessDialog(id);
  }

  protected handleError() {
    this.toasts.openErrorToast();
  }

  isFormValid() {
    return this.form.valid;
  }

  /**
   * Check a sign-up form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid;
  }
}
