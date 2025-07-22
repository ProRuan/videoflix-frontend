import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { AuthForm } from '../../shared/models/auth-form';
import { InputValidation } from '../../shared/services/input-validation';
import { Authentication } from '../../shared/services/authentication';
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
  private fb: FormBuilder = inject(FormBuilder);
  private validation: InputValidation = inject(InputValidation);
  private auth: Authentication = inject(Authentication);

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
   * Perform a reset-password request on submit.
   */
  onPasswordReset() {
    if (this.isFormInvalid()) return;
    const payload = this.getPayload();
    this.performRequest(() => this.auth.resetPassword(payload));
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
   * Show a success dialog upon a successful password reset.
   */
  protected handleSuccess(): void {
    this.showSuccessDialog(DialogIds.ForgotPasswordSuccess);
  }
}
