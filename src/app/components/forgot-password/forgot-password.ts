import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { AuthForm } from '../../shared/models/auth-form';
import { InputValidation } from '../../shared/services/input-validation';
import { Authentication } from '../../shared/services/authentication';
import { FormGroupControls } from '../../shared/interfaces/form-group-controls';
import { DialogIds } from '../../shared/ts/enums';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, Header, EmailInput, PrimaryButton, Footer],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})

/**
 * Class representing a forgot-password component.
 * @extends AuthForm
 */
export class ForgotPassword extends AuthForm {
  private validation: InputValidation = inject(InputValidation);
  private auth: Authentication = inject(Authentication);

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
    if (this.isFormInvalid()) return;
    const payload = this.getPayload();
    this.auth.resetPassword(payload).subscribe({
      next: () => this.handleSuccess(),
      error: () => this.handleError(),
    });
  }

  /**
   * Show a success dialog upon a successful password reset.
   */
  private handleSuccess() {
    this.showSuccessDialog(DialogIds.ForgotPasswordSuccess);
  }
}
