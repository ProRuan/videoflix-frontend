import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { AUTH_DIALOG_CONFIG } from '@core/auth/constants';
import { AuthFormBase } from '@core/auth/directives';
import { EmailForm, EmailPayload, EmailResponse } from '@core/auth/interfaces';
import { AuthStore, AuthUtils } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { EmailInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { DialogConfig } from '@shared/interfaces';
import { DialogManager, ToastManager } from '@shared/services';

/**
 * Class representing a reactivate-account component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-reactivate-account',
  imports: [Button, EmailInput, LoadingBar, ReactiveFormsModule],
  templateUrl: './reactivate-account.html',
  styleUrl: './reactivate-account.scss',
})
export class ReactivateAccount extends AuthFormBase<
  EmailForm,
  EmailPayload,
  EmailResponse
> {
  private auth = inject(AuthStore);
  private utils = inject(AuthUtils);
  private dialogs = inject(DialogManager);
  private toasts = inject(ToastManager);

  private readonly config: DialogConfig = AUTH_DIALOG_CONFIG.reactivateAccount;

  /**
   * Get an email form.
   * @returns The email form.
   */
  getForm(): FormGroup<EmailForm> {
    return this.utils.getEmailForm();
  }

  /**
   * Get a payload for account reactivation.
   * @returns The payload for account reactivation.
   */
  getPayload(): EmailPayload {
    return this.utils.getEmailPayload(this.form);
  }

  /**
   * Request an account reactivation from the Videoflix API.
   * @param payload - The payload for the account reactivation.
   * @returns An Observable with the email response.
   */
  request$(payload: EmailPayload): Observable<EmailResponse> {
    return this.auth.reactivateAccount(payload);
  }

  /**
   * Show a success dialog upon successful account reactivation.
   */
  onSuccess(): void {
    this.form.reset();
    this.dialogs.showSuccess(this.config);
  }

  /**
   * Show an error toast upon failed account reactivation.
   * @param error - The error response.
   */
  onError(error: HttpErrorResponse): void {
    this.toasts.showError(error);
  }

  /**
   * Close success dialog and error toast.
   */
  override destroyOptions(): void {
    this.dialogs.close();
    this.toasts.close();
  }
}
