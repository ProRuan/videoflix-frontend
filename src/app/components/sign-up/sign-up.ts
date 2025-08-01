import { Component, inject, OnInit } from '@angular/core';
import { AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';
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
import { FormGroupControls } from '../../shared/interfaces/form-group-controls';
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
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);
  private validator: FormValidator = inject(FormValidator);
  private auth: Authentication = inject(Authentication);

  protected controls: FormGroupControls = {
    email: ['', this.validation.email],
    password: ['', this.validation.password],
    confirmPassword: ['', this.validation.password],
  };

  protected override options: AbstractControlOptions | null = {
    validators: [this.validator.passwordMatch()],
  };

  /**
   * Initialize a sign-up component.
   */
  override ngOnInit() {
    this.setForm();
    this.updateEmail();
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
   *
   * If successful, open a success dialog with further information.
   *
   * Otherwise, show an error toast.
   */
  onRegistration() {
    if (this.isFormInvalid()) return;
    const payload = this.getPayload();
    this.auth.registerUser(payload).subscribe({
      next: () => this.handleSuccess(),
      error: () => this.handleError(),
    });
  }

  /**
   * Show a success dialog upon a successful user registration.
   */
  private handleSuccess() {
    this.showSuccessDialog(DialogIds.SignUpSuccess);
  }
}
