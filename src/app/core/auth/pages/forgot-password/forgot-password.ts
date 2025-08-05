import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingBar } from '../../../../shared/components/loading-bar/loading-bar';
import { EmailInput } from '../../../../shared/components/email-input/email-input';
import { PrimaryButton } from '../../../../shared/components/primary-button/primary-button';
import { AuthForm } from '../../../../shared/models/auth-form';
import { InputValidation } from '../../../../shared/services/input-validation';
import { FormGroupControls } from '../../../../shared/interfaces/form-group-controls';
import { DialogIds } from '../../../../shared/ts/enums';

/**
 * Class representing a forgot-password component.
 * @extends AuthForm
 */
@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingBar,
    EmailInput,
    PrimaryButton,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword extends AuthForm {
  private validation: InputValidation = inject(InputValidation);

  protected override controls: FormGroupControls = {
    email: ['', this.validation.email],
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
