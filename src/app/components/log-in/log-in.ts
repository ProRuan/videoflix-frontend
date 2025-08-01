import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { AuthForm } from '../../shared/models/auth-form';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';
import { Authentication } from '../../shared/services/authentication';
import { AuthResponse } from '../../shared/interfaces/auth-response';
import { FormGroupControls } from '../../shared/interfaces/form-group-controls';

@Component({
  selector: 'app-log-in',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Header,
    EmailInput,
    PasswordInput,
    PrimaryButton,
    Footer,
  ],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})

/**
 * Class representing a log-in component.
 * @extends AuthForm
 */
export class LogIn extends AuthForm {
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);
  private auth: Authentication = inject(Authentication);

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
    if (this.isFormInvalid()) return;
    const payload = this.getPayload();
    this.auth.logInUser(payload).subscribe({
      next: (response) => this.handleSuccess(response),
      error: () => this.handleError(),
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
