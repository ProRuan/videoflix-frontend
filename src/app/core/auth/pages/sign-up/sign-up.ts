import { Component, inject, OnInit } from '@angular/core';
import { AbstractControlOptions, ReactiveFormsModule } from '@angular/forms';

import { AuthFormBase } from '@core/auth/directives';
import { FormGroupControls, RegistrationPayload } from '@core/auth/interfaces';
import { Authenticator } from '@core/auth/services';
import { PrimaryButton } from '@shared/components/buttons';
import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { DialogIds } from '@shared/constants';
import { FormValidator } from '@shared/modules/form-validation';

import { Videoflix } from '../../../../shared/services/videoflix';

/**
 * Class representing a sign-up component.
 * @extends AuthFormBase
 * @implements {OnInit}
 */
@Component({
  selector: 'app-sign-up',
  imports: [
    ReactiveFormsModule,
    LoadingBar,
    EmailInput,
    PasswordInput,
    PrimaryButton,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp extends AuthFormBase implements OnInit {
  private auth: Authenticator = inject(Authenticator);
  private videoflix: Videoflix = inject(Videoflix);

  protected controls: FormGroupControls = {
    email: ['', FormValidator.emailValidators],
    password: ['', FormValidator.passwordValidators],
    confirmPassword: ['', FormValidator.passwordValidators],
  };

  protected override options: AbstractControlOptions | null = {
    validators: FormValidator.formValidators,
  };

  /**
   * Get a registration payload.
   * @returns The registration payload.
   */
  get payload(): RegistrationPayload {
    return {
      email: this.email?.value,
      password: this.password?.value,
      repeated_password: this.confirmPassword?.value,
    };
  }

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
    this.performRequest({
      request$: (payload: RegistrationPayload) => this.auth.register(payload),
      onSuccess: () => this.handleSuccess(),
    });
  }

  /**
   * Show a success dialog upon a successful user registration.
   */
  private handleSuccess() {
    this.showSuccessDialog(DialogIds.SignUpSuccess);
  }
}
