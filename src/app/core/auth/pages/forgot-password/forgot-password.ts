import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormBase } from '@core/auth/directives';

import { DialogIds } from '@shared/constants';
import { EmailInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { PrimaryButton } from '@shared/components/buttons';
import { FormValidator } from '@shared/modules/form-validation';

import { FormGroupControls } from '../../../../shared/interfaces/form-group-controls';

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
  protected override controls: FormGroupControls = {
    email: ['', FormValidator.emailValidators],
  };

  /**
   * Perform a reset-password request on submit.
   *
   * If successful, open a success dialog with further information.
   *
   * Otherwise, show an error toast.
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
