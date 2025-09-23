import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { AuthFormBase } from '@core/auth/directives';
import { EmailForm, EmailPayload, EmailResponse } from '@core/auth/interfaces';
import { AuthStore, AuthUtils } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { EmailInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { DialogIds } from '@shared/constants';
import { DialogManager, ToastManager } from '@shared/services';

/**
 * Class representing a forgot-password component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-forgot-password',
  imports: [Button, EmailInput, LoadingBar, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword extends AuthFormBase<
  EmailForm,
  EmailPayload,
  EmailResponse
> {
  private auth = inject(AuthStore);
  private utils = inject(AuthUtils);
  private dialogs = inject(DialogManager);
  private toasts = inject(ToastManager);

  /**
   * Get an email form.
   * @returns The email form.
   */
  getForm(): FormGroup<EmailForm> {
    return this.utils.getEmailForm();
  }

  /**
   * Get a payload for a password reset.
   * @returns The payload for the password reset.
   */
  getPayload(): EmailPayload {
    return this.utils.getEmailPayload(this.form);
  }

  /**
   * Request a password reset from the Videoflix API.
   * @param payload - The payload for the password reset.
   * @returns An Observable with the email response.
   */
  request$(payload: EmailPayload): Observable<EmailResponse> {
    return this.auth.resetPassword(payload);
  }

  /**
   * Show a success dialog upon successful password reset.
   */
  onSuccess(): void {
    this.form.reset();
    this.toasts.close();
    this.dialogs.openSuccessDialog(DialogIds.ForgotPasswordSuccess);
  }

  /**
   * Show an error toast upon failed password reset.
   * @param error - The error response.
   */
  onError(error: HttpErrorResponse): void {
    this.toasts.showError(error);
  }
}
