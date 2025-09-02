import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormBase } from '@core/auth/directives';
import { FormGroupControls } from '@core/auth/interfaces';
import { Button } from '@shared/components/buttons';
import { EmailInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { DialogIds } from '@shared/constants';
import { FormValidator } from '@shared/modules/form-validation';

/**
 * Class representing a forgot-password component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-forgot-password',
  imports: [Button, ReactiveFormsModule, LoadingBar, EmailInput],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword extends AuthFormBase {
  protected override controls: FormGroupControls = {
    email: ['', FormValidator.emailValidators],
  };

  /**
   * Perform a reset-password request on submit.
   *
   * Opens a success dialog with further information on success;
   * shows an error toast on error.
   */
  onPasswordReset() {
    this.performRequest('resetPassword', () => this.handleSuccess());
  }

  /**
   * Show a success dialog upon a successful password reset.
   */
  private handleSuccess() {
    this.showSuccessDialog(DialogIds.ForgotPasswordSuccess);
  }
}
