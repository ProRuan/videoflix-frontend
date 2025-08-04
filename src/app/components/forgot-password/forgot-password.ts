import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { LoadingBar } from '../../shared/components/loading-bar/loading-bar';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { AuthForm } from '../../shared/models/auth-form';
import { InputValidation } from '../../shared/services/input-validation';
import { FormGroupControls } from '../../shared/interfaces/form-group-controls';
import { DialogIds } from '../../shared/ts/enums';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Header,
    LoadingBar,
    EmailInput,
    PrimaryButton,
    Footer,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})

/**
 * Class representing a forgot-password component.
 * @extends AuthForm
 */
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
