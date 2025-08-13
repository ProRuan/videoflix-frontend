import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormBase } from '@core/auth/directives';
import { EmailPayload, FormGroupControls } from '@core/auth/interfaces';

import { DialogIds } from '@shared/constants';
import { Authenticator } from '@core/auth/services';
import { PrimaryButton } from '@shared/components/buttons';
import { EmailInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { FormValidator } from '@shared/modules/form-validation';

/**
 * Class representing a forgot-password component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, LoadingBar, EmailInput, PrimaryButton],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword extends AuthFormBase {
  auth: Authenticator = inject(Authenticator);

  protected override controls: FormGroupControls = {
    email: ['', FormValidator.emailValidators],
  };

  /**
   * Get an email paylaod.
   * @returns The email payload.
   */
  get payload(): EmailPayload {
    return { email: this.email?.value };
  }

  /**
   * Perform a reset-password request on submit.
   *
   * If successful, open a success dialog with further information.
   *
   * Otherwise, show an error toast.
   */
  onPasswordReset() {
    this.performRequest({
      request$: (payload: EmailPayload) => this.auth.resetPassword(payload),
      onSuccess: () => this.handleSuccess(),
    });
  }

  /**
   * Show a success dialog upon a successful password reset.
   */
  private handleSuccess() {
    this.showSuccessDialog(DialogIds.ForgotPasswordSuccess);
  }
}
