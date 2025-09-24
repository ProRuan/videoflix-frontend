import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

import { ERROR_TOAST_CATALOG } from '@core/auth/constants';
import { AuthFormBase } from '@core/auth/directives';
import {
  AuthResponse,
  ErrorToastConfig,
  LoginForm,
  LoginPayload,
} from '@core/auth/interfaces';
import { AuthStore, AuthUtils, UserClient } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { EmailInput, PasswordInput } from '@shared/components/inputs';
import { LoadingBar } from '@shared/components/loaders';
import { ToastManager } from '@shared/services';

/**
 * Class representing a log-in component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-log-in',
  imports: [
    Button,
    EmailInput,
    LoadingBar,
    PasswordInput,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn extends AuthFormBase<LoginForm, LoginPayload, AuthResponse> {
  private router = inject(Router);
  private auth = inject(AuthStore);
  private utils = inject(AuthUtils);
  private user = inject(UserClient);
  private toasts = inject(ToastManager);

  private readonly error: ErrorToastConfig = ERROR_TOAST_CATALOG.logIn;

  /**
   * Get a login form.
   * @returns The login form.
   */
  getForm(): FormGroup<LoginForm> {
    return this.utils.getLoginForm();
  }

  /**
   * Get the payload for a login.
   * @returns The payload for the login.
   */
  getPayload(): LoginPayload {
    return this.utils.getLoginPayload(this.form);
  }

  /**
   * Request a login from the Videoflix API.
   * @param payload - The payload for the login.
   * @returns An Observable with the authentication response.
   */
  request$(payload: LoginPayload): Observable<AuthResponse> {
    return this.auth.logIn(payload);
  }

  /**
   * Complete the login and redirect user to video offer.
   * @param response - The authentication response.
   */
  onSuccess(response: AuthResponse): void {
    this.form.reset();
    this.user.logIn(response);
    this.router.navigateByUrl(`/video/offer/${response.token}`);
  }

  /**
   * Show an error toast upon failed login.
   * @param error - The error response.
   */
  onError(error: HttpErrorResponse): void {
    this.password.reset();
    this.toasts.showError(error, this.error);
  }

  /**
   * Close error toast.
   */
  override destroyOptions(): void {
    this.toasts.close();
  }
}
