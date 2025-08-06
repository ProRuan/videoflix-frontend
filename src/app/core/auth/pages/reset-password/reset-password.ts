import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';

import { AuthFormBase } from '@core/auth/directives';

import { PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { PrimaryButton } from '@shared/components/buttons';

import { InputValidation } from '../../../../shared/services/input-validation';
import { FormValidator } from '../../../../shared/services/form-validator';
import { FormGroupControls } from '../../../../shared/interfaces/form-group-controls';
import { DialogIds } from '../../../../shared/ts/enums';

/**
 * Class representing a reset-password component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingBar,
    PasswordInput,
    PrimaryButton,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword extends AuthFormBase {
  private validation: InputValidation = inject(InputValidation);
  private validator: FormValidator = inject(FormValidator);

  protected controls: FormGroupControls = {
    password: ['', this.validation.password],
    confirmPassword: ['', this.validation.password],
  };

  protected override options: AbstractControlOptions | null = {
    validators: [this.validator.passwordMatch()],
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
