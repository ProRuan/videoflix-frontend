import { Component, inject } from '@angular/core';
import { AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { AuthForm } from '../../shared/models/auth-form';
import { InputValidation } from '../../shared/services/input-validation';
import { FormValidator } from '../../shared/services/form-validator';
import { Authentication } from '../../shared/services/authentication';
import { FormGroupControls } from '../../shared/interfaces/form-group-controls';
import { DialogIds } from '../../shared/ts/enums';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, Header, PasswordInput, PrimaryButton, Footer],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})

/**
 * Class representing a reset-password component.
 * @extends AuthForm
 */
export class ResetPassword extends AuthForm {
  private validation: InputValidation = inject(InputValidation);
  private validator: FormValidator = inject(FormValidator);
  private auth: Authentication = inject(Authentication);

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
    if (this.isFormInvalid()) return;
    const payload = this.getPayload();
    this.auth.updatePassword(payload).subscribe({
      next: () => this.handleSuccess(),
      error: () => this.handleError(),
    });
  }

  /**
   * Show a success dialog upon a successful password update.
   */
  private handleSuccess(): void {
    this.showSuccessDialog(DialogIds.ResetPasswordSuccess);
  }
}
