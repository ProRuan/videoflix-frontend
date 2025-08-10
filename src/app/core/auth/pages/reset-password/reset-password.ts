import { Component } from '@angular/core';
import { AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';

import { AuthFormBase } from '@core/auth/directives';

import { DialogIds } from '@shared/constants';
import { PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { PrimaryButton } from '@shared/components/buttons';
import { FormValidator } from '@shared/modules/form-validation';

import { FormGroupControls } from '../../../../shared/interfaces/form-group-controls';

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
   * If successful, open a success dialog with further information.
   *
   * Otherwise, show an error toast.
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
