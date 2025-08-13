import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthFormBase } from '@core/auth/directives';
import { AuthResponse, FormGroupControls } from '@core/auth/interfaces';
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
  private videoflix: Videoflix = inject(Videoflix);

  protected controls: FormGroupControls = {
    email: ['', FormValidator.emailValidators],
    password: ['', FormValidator.passwordValidators],
  };

  /**
   * Perform a user log-in on submit.
   *
   * Redirects to the video offer page on success;
   * shows an error toast on error.
   */
  onLogIn() {
    this.performRequest('logIn', (r: AuthResponse) => this.handleSuccess(r));
  }

  /**
   * Set the auth token and redirect to the video offer page.
   * @param response The auth response.
   */
  private handleSuccess(response: AuthResponse) {
    this.toasts.close();
    this.videoflix.setAuthData(response);
    this.router.navigateByUrl('/video-offer');
  }
}
