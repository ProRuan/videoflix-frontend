import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { AuthForm } from '../../shared/models/auth-form';
import { InputValidation } from '../../shared/services/input-validation';
import { FormValidator } from '../../shared/services/form-validator';
import { Authentication } from '../../shared/services/authentication';
import { ResetPasswordPayload } from '../../shared/interfaces/reset-password-payload';
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
 * @implements {OnInit}
 */
export class ResetPassword extends AuthForm implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private validation: InputValidation = inject(InputValidation);
  private validator: FormValidator = inject(FormValidator);
  private auth: Authentication = inject(Authentication);

  form!: FormGroup;

  /**
   * Initialize a reset-password component.
   */
  ngOnInit(): void {
    this.setForm();
  }

  /**
   * Set a reset-password form.
   */
  protected setForm() {
    this.form = this.fb.group(
      {
        password: ['', this.validation.password],
        confirmPassword: ['', this.validation.password],
      },
      { validators: [this.validator.passwordMatch()] }
    );
  }

  /**
   * Perform an update-password request on submit.
   */
  onPasswordUpdate() {
    if (this.isFormInvalid()) return;
    const payload = this.getPayload();
    this.performRequest(() => this.auth.updatePassword(payload));
  }

  /**
   * Get a reset-password payload.
   * @returns The reset-password payload.
   */
  protected getPayload(): ResetPasswordPayload {
    return {
      token: 'be74f002e7c87632dd3ca97b37d4ed47d1db71b9',
      password: this.password?.value,
      repeated_password: this.confirmPassword?.value,
    };
  }

  /**
   * Show a success dialog upon a successful password update.
   */
  protected handleSuccess(): void {
    this.showSuccessDialog(DialogIds.ResetPasswordSuccess);
  }
}
