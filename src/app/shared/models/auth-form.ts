import { Directive, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DialogManager } from '../../shared/services/dialog-manager';
import { ToastManager } from '../../shared/services/toast-manager';
import { DialogIds } from '../../shared/ts/enums';

@Directive()
/**
 * Abstract class representing an auth form.
 */
export abstract class AuthForm {
  protected dialogs: DialogManager = inject(DialogManager);
  protected toasts: ToastManager = inject(ToastManager);

  abstract form: FormGroup;

  protected abstract setForm(): void;
  protected abstract getPayload(): any;
  protected abstract handleSuccess(value?: any): void;

  /**
   * Get the email control of a form.
   * @returns The email control or null.
   */
  get email() {
    return this.form.get('email');
  }

  /**
   * Get the password control of a form.
   * @returns The password control or null.
   */
  get password() {
    return this.form.get('password');
  }

  /**
   * Get the confirm-password control of a form.
   * @returns The confirm-password control or null.
   */
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  /**
   * Get a possible error caused by a password mismatch.
   * @returns A boolean value.
   */
  get matchError() {
    return this.form.hasError('passwordMismatch');
  }

  /**
   * Perform a request depending on the provided request method.
   * @param request - The request method.
   */
  protected performRequest(request: () => Observable<any>) {
    request().subscribe({
      next: (value) => this.handleSuccess(value),
      error: () => this.handleError(),
    });
  }

  /**
   * Show an error toast upon a failed request.
   */
  protected handleError() {
    this.toasts.openErrorToast();
  }

  /**
   * Show a success dialog.
   * @param id - The success dialog id.
   */
  protected showSuccessDialog(id: DialogIds) {
    this.form.reset();
    this.toasts.slideOutImmediately();
    this.dialogs.openSuccessDialog(id);
  }

  /**
   * Check a sign-up form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid;
  }
}
