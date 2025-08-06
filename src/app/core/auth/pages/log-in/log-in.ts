import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthFormBase } from '@core/auth/directives';

import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { PrimaryButton } from '@shared/components/buttons';

import { Videoflix } from '../../../../shared/services/videoflix';
import { InputValidation } from '../../../../shared/services/input-validation';
import { AuthResponse } from '../../../../shared/interfaces/auth-response';
import { FormGroupControls } from '../../../../shared/interfaces/form-group-controls';

/**
 * Class representing a log-in component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-log-in',
  imports: [
    CommonModule,
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
  private validation: InputValidation = inject(InputValidation);

  protected controls: FormGroupControls = {
    email: ['', this.validation.email],
    password: ['', this.validation.password],
  };

  /**
   * Perform a user log-in on submit.
   *
   * If successful, redirect to the video offer component.
   *
   * Otherwise, show an error toast.
   */
  onLogIn() {
    this.performRequest('logInUser', this.handleSuccess.bind(this));
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
