import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import {
  ERROR_TOAST_CATALOG,
  SUCCESS_DIALOG_CATALOG,
} from '@core/auth/constants';
import { AuthFormBase } from '@core/auth/directives';
import {
  ErrorToastConfig,
  RegistrationForm,
  RegistrationPayload,
  RegistrationResponse,
  SuccessDialogConfig,
} from '@core/auth/interfaces';
import { AuthStore, AuthUtils, UserClient } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { DialogManager, ToastManager } from '@shared/services';

/**
 * Class representing a sign-up component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-sign-up',
  imports: [Button, EmailInput, LoadingBar, PasswordInput, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp extends AuthFormBase<
  RegistrationForm,
  RegistrationPayload,
  RegistrationResponse
> {
  auth = inject(AuthStore);
  utils = inject(AuthUtils);
  user = inject(UserClient);
  dialogs = inject(DialogManager);
  toasts = inject(ToastManager);

  private readonly config: SuccessDialogConfig = SUCCESS_DIALOG_CATALOG.signUp;
  private readonly error: ErrorToastConfig = ERROR_TOAST_CATALOG.signUp;

  /**
   * Get a registration form.
   * @returns The registration form.
   */
  getForm(): FormGroup<RegistrationForm> {
    return this.utils.getRegistrationForm();
  }

  /**
   * Update the email control with a user´s start email.
   */
  override initOptions(): void {
    this.email.setValue(this.user.startEmail);
  }

  /**
   * Get the payload for a registration.
   * @returns The payload for the registration.
   */
  getPayload(): RegistrationPayload {
    return this.utils.getRegistrationPayload(this.form);
  }

  /**
   * Request a registration from the Videoflix API.
   * @param payload - The registration payload.
   * @returns An Observable with the registration response.
   */
  request$(payload: RegistrationPayload): Observable<RegistrationResponse> {
    return this.auth.register(payload);
  }

  /**
   * Show a success dialog upon successful registration.
   */
  onSuccess(): void {
    this.form.reset();
    this.dialogs.showSuccess(this.config);
  }

  /**
   * Show an error toast upon failed registration.
   * @param error - The error response.
   */
  onError(error: HttpErrorResponse): void {
    this.toasts.showError(error, this.error);
  }

  /**
   * Close success dialog and error toast.
   */
  override destroyOptions(): void {
    this.dialogs.close();
    this.toasts.close();
  }
}
