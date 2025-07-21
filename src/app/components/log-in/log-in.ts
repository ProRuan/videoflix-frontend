import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { EmailInput } from '../../shared/components/email-input/email-input';
import { PasswordInput } from '../../shared/components/password-input/password-input';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { Footer } from '../../shared/components/footer/footer';
import { Videoflix } from '../../shared/services/videoflix';
import { InputValidation } from '../../shared/services/input-validation';
import { Authentication } from '../../shared/services/authentication';
import { ToastManager } from '../../shared/services/toast-manager';
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
 * @implements {OnInit}
 */
export class LogIn implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);
  private validation: InputValidation = inject(InputValidation);
  private auth: Authentication = inject(Authentication);
  private toasts: ToastManager = inject(ToastManager);

  form!: FormGroup;

  /**
   * Get the email control of a log-in form.
   * @returns The email control or null.
   */
  get email() {
    return this.form.get('email');
  }

  /**
   * Get the password control of a log-in form.
   * @returns The password control or null.
   */
  get password() {
    return this.form.get('password');
  }

  /**
   * Initialize a log-in component.
   */
  ngOnInit(): void {
    this.setForm();
  }

  /**
   * Set a log-in form.
   */
  private setForm() {
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
    const payload = this.getPayload();
    this.auth.logInUser(payload).subscribe({
      next: (response) => this.logInUser(response),
      error: () => this.openErrorToast(),
    });
  }

  /**
   * Get a log-in payload.
   * @returns The log-in payload.
   */
  private getPayload(): LogInPayload {
    return {
      email: this.email?.value,
      password: this.password?.value,
    };
  }

  /**
   * Log-in a user after setting the auth token.
   * @param response The response of the API log-in endpoint.
   */
  private logInUser(response: any) {
    this.videoflix.setAuthData(response);
    this.router.navigateByUrl('video-offer');
  }

  /**
   * Open an error toast.
   */
  private openErrorToast() {
    this.toasts.openErrorToast();
  }

  /**
   * Check a log-in form for invalidity.
   * @returns A boolean value.
   */
  isFormInvalid() {
    return this.form.invalid;
  }
}
