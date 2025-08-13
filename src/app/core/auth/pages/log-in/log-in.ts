import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthFormBase } from '@core/auth/directives';
import {
  AuthResponse,
  FormGroupControls,
  LoginPayload,
} from '@core/auth/interfaces';
import { Authenticator } from '@core/auth/services';
import { PrimaryButton } from '@shared/components/buttons';
import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { FormValidator } from '@shared/modules/form-validation';

import { Videoflix } from '../../../../shared/services/videoflix';

/**
 * Class representing a log-in component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-log-in',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LoadingBar,
    EmailInput,
    PasswordInput,
    PrimaryButton,
  ],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn extends AuthFormBase {
  private router: Router = inject(Router);
  private auth: Authenticator = inject(Authenticator);
  private videoflix: Videoflix = inject(Videoflix);

  protected controls: FormGroupControls = {
    email: ['', FormValidator.emailValidators],
    password: ['', FormValidator.passwordValidators],
  };

  /**
   * Get a login payload.
   * @returns The login payload.
   */
  get payload(): LoginPayload {
    return {
      email: this.email?.value,
      password: this.password?.value,
    };
  }

  /**
   * Perform a user log-in on submit.
   *
   * If successful, redirect to the video offer component.
   *
   * Otherwise, show an error toast.
   */
  onLogIn() {
    this.performRequest({
      request$: (payload: LoginPayload) => this.auth.logIn(payload),
      onSuccess: (response) => this.handleSuccess(response),
    });
  }

  /**
   * Set the auth token and redirect to the video offer component.
   * @param response The auth response.
   */
  private handleSuccess(response: AuthResponse) {
    this.toasts.close();
    this.videoflix.setAuthData(response);
    this.router.navigateByUrl('/video-offer');
  }
}
