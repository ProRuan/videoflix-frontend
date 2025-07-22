import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { AuthForm } from '../../shared/models/auth-form';
import { Videoflix } from '../../shared/services/videoflix';
import { AuthResponse } from '../../shared/interfaces/auth-response';
import { LogInPayload } from '../../shared/interfaces/log-in-payload';

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
 * @implements {OnInit}
 */
export class LogIn extends AuthForm implements OnInit {
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);

  form!: FormGroup;

  /**
   * Initialize a log-in component.
   */
  ngOnInit(): void {
    this.setForm();
  }

  /**
   * Set a log-in form.
   */
  protected setForm() {
    this.form = this.fb.group({
      email: ['', this.validation.email],
      password: ['', this.validation.password],
    });
  }

  /**
   * Log in a user on submit.
   * If successful, the user is redirected to the video offer component.
   * Otherwise, an error toast is shown.
   */
  onLogIn() {
    if (this.isFormValid()) {
      const payload = this.getPayload();
      this.performRequest(() => this.auth.logInUser(payload));
    }
  }

  /**
   * Get a log-in payload.
   * @returns The log-in payload.
   */
  protected getPayload(): LogInPayload {
    return {
      email: this.email?.value,
      password: this.password?.value,
    };
  }

  /**
   * Set the auth token and redirect the user to the video offer component.
   * @param response The authentication response.
   */
  protected handleSuccess(response: AuthResponse): void {
    this.videoflix.setAuthData(response);
    this.router.navigateByUrl('video-offer');
  }
}
