import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { AuthForm } from '../../shared/models/auth-form';
import { ForgotPasswordPayload } from '../../shared/interfaces/forgot-password-payload';
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
 * @implements {OnInit}
 */
export class ForgotPassword extends AuthForm implements OnInit {
  form!: FormGroup;

  /**
   * Initialize a forgot-password component.
   */
  ngOnInit(): void {
    this.setForm();
  }

  /**
   * Set a forgot-password form.
   */
  protected setForm() {
    this.form = this.fb.group({
      email: ['', this.validation.email],
    });
  }

  /**
   * Send a password-reset email on submit.
   * If successful, an email is sent.
   * Otherwise, an error toast is shown.
   */
  onEmailSend() {
    if (this.isFormValid()) {
      const payload = this.getPayload();
      this.performRequest(() => this.auth.requestPasswordReset(payload));
    }
  }

  /**
   * Get a forgot-password payload.
   * @returns The forgot-password payload.
   */
  protected getPayload(): ForgotPasswordPayload {
    return {
      email: this.email?.value,
    };
  }

  /**
   * Open a success dialog upon a successful password reset request.
   */
  protected handleSuccess(): void {
    this.showSuccessDialog(DialogIds.ForgotPasswordSuccess);
  }
}
