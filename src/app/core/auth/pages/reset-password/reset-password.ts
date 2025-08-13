import { Component, inject } from '@angular/core';
import { AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';

import { AuthFormBase } from '@core/auth/directives';
import { FormGroupControls, ResetPasswordPayload } from '@core/auth/interfaces';
import { Authenticator } from '@core/auth/services';
import { PrimaryButton } from '@shared/components/buttons';
import { PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { DialogIds } from '@shared/constants';
import { FormValidator } from '@shared/modules/form-validation';

/**
 * Class representing a reset-password component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, LoadingBar, PasswordInput, PrimaryButton],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword extends AuthFormBase {
  private auth: Authenticator = inject(Authenticator);

  protected controls: FormGroupControls = {
    password: ['', FormValidator.passwordValidators],
    confirmPassword: ['', FormValidator.passwordValidators],
  };

  protected override options: AbstractControlOptions | null = {
    validators: FormValidator.formValidators,
  };

  /**
   * Get a reset-password payload.
   * @returns The reset-password payload.
   */
  get payload(): ResetPasswordPayload {
    return {
      password: this.password?.value,
      repeated_password: this.confirmPassword?.value,
    };
  }

  /**
   * Perform an update-password request on submit.
   *
   * If successful, open a success dialog with further information.
   *
   * Otherwise, show an error toast.
   */
  onPasswordUpdate() {
    this.performRequest({
      request$: (payload: ResetPasswordPayload) =>
        this.auth.updatePassword(payload),
      onSuccess: () => this.handleSuccess(),
    });
  }

  /**
   * Show a success dialog upon a successful password update.
   */
  private handleSuccess(): void {
    this.showSuccessDialog(DialogIds.ResetPasswordSuccess);
  }
}
