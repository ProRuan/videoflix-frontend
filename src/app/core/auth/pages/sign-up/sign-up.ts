import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';

import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { PrimaryButton } from '@shared/components/buttons';

import { AuthForm } from '../../../../shared/models/auth-form';
import { Videoflix } from '../../../../shared/services/videoflix';
import { InputValidation } from '../../../../shared/services/input-validation';
import { FormValidator } from '../../../../shared/services/form-validator';
import { FormGroupControls } from '../../../../shared/interfaces/form-group-controls';
import { DialogIds } from '../../../../shared/ts/enums';

/**
 * Class representing a sign-up component.
 * @extends AuthForm
 * @implements {OnInit}
 */
@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingBar,
    EmailInput,
    PasswordInput,
    PrimaryButton,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp extends AuthForm implements OnInit {
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);
  private validator: FormValidator = inject(FormValidator);

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
    this.performRequest('registerUser', () => this.handleSuccess());
  }

  /**
   * Show a success dialog upon a successful user registration.
   */
  private handleSuccess() {
    this.showSuccessDialog(DialogIds.SignUpSuccess);
  }
}
