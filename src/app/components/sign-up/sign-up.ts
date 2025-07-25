import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { AuthForm } from '../../shared/models/auth-form';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';
import { FormValidator } from '../../shared/services/form-validator';
import { Authentication } from '../../shared/services/authentication';
import { RegistrationPayload } from '../../shared/interfaces/registration-payload';
import { DialogIds } from '../../shared/ts/enums';

@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    Header,
    EmailInput,
    PasswordInput,
    PrimaryButton,
    Footer,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})

/**
 * Class representing a sign-up component.
 * @extends AuthForm
 * @implements {OnInit}
 */
export class SignUp extends AuthForm implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);
  private validator: FormValidator = inject(FormValidator);
  private auth: Authentication = inject(Authentication);

  form!: FormGroup;

  /**
   * Initialize a sign-up component.
   */
  ngOnInit() {
    this.setForm();
    this.updateEmail();
  }

  /**
   * Set a sign-up form.
   */
  protected setForm() {
    this.form = this.fb.group(
      {
        email: ['', this.validation.email],
        password: ['', this.validation.password],
        confirmPassword: ['', this.validation.password],
      },
      {
        validators: [this.validator.passwordMatch()],
      }
    );
  }

  /**
   * Update an email control with the cached value
   * provided by the startsite form.
   */
  private updateEmail() {
    this.email?.setValue(this.videoflix.cachedEmail);
  }

  /**
   * Perform a user registration on submit.
   */
  onRegistration() {
    if (this.isFormInvalid()) return;
    const payload = this.getPayload();
    this.performRequest(() => this.auth.registerUser(payload));
  }

  /**
   * Get a registration payload.
   * @returns The registration payload.
   */
  protected getPayload(): RegistrationPayload {
    return {
      email: this.email?.value,
      password: this.password?.value,
      repeated_password: this.confirmPassword?.value,
    };
  }

  /**
   * Show a success dialog upon a successful user registration.
   */
  protected handleSuccess(): void {
    this.showSuccessDialog(DialogIds.SignUpSuccess);
  }
}
