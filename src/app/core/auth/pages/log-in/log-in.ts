import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoadingBar } from '../../../../shared/components/loading-bar/loading-bar';
import { EmailInput, PasswordInput } from '../../../../shared/components';
import { PrimaryButton } from '../../../../shared/components/primary-button/primary-button';
import { AuthForm } from '../../../../shared/models/auth-form';
import { Videoflix } from '../../../../shared/services/videoflix';
import { InputValidation } from '../../../../shared/services/input-validation';
import { AuthResponse } from '../../../../shared/interfaces/auth-response';
import { FormGroupControls } from '../../../../shared/interfaces/form-group-controls';

/**
 * Class representing a log-in component.
 * @extends AuthForm
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
export class LogIn extends AuthForm {
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
