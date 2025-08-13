import { Component } from '@angular/core';
import { AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';

import { AuthFormBase } from '@core/auth/directives';
import { FormGroupControls } from '@core/auth/interfaces';
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
  protected controls: FormGroupControls = {
    password: ['', FormValidator.passwordValidators],
    confirmPassword: ['', FormValidator.passwordValidators],
  };

  protected override options: AbstractControlOptions | null = {
    validators: FormValidator.formValidators,
  };

  /**
   * Perform an update-password request on submit.
   *
   * Opens a success dialog with further information on success;
   * shows an error toast on error.
   */
  onPasswordUpdate() {
    this.performRequest('updatePassword', () => this.handleSuccess());
  }

  /**
   * Show a success dialog upon a successful password update.
   */
  private handleSuccess(): void {
    this.showSuccessDialog(DialogIds.ResetPasswordSuccess);
  }
}
