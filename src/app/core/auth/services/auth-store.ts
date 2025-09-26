import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Api } from '@shared/services/api';

import {
  AuthResponse,
  EmailPayload,
  EmailResponse,
  LoginPayload,
  RegistrationPayload,
  RegistrationResponse,
  TokenPayload,
  UserResponse,
} from '../interfaces';

/**
 * Class representing an authentication store service.
 *
 * Provides methods for authentication and Videoflix API.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private api = inject(Api);

  private token: string = '';

  /**
   * Get the current authentication token.
   * @returns The current authentication token.
   */
  getToken() {
    return this.token;
  }

  /**
   * Set the current authentication token.
   * @param token - The authentication token to be set.
   */
  setToken(token: string) {
    this.token = token;
  }

  /**
   * Check email via Videoflix API.
   * @param payload - The payload for the email check.
   * @returns An Observable with the email response.
   */
  checkEmail(payload: EmailPayload): Observable<EmailResponse> {
    return this.api.post('email-check', payload, { skipAuth: true });
  }

  /**
   * Register via Videoflix API.
   * @param payload - The payload for the registration.
   * @returns An Observable with the registration response.
   */
  register(payload: RegistrationPayload): Observable<RegistrationResponse> {
    return this.api.post('registration', payload, { skipAuth: true });
  }

  /**
   * Activate account via Videoflix API.
   * @param payload - The payload for the account activation.
   * @returns An Observable with the registration response.
   */
  activateAccount(payload: TokenPayload): Observable<RegistrationResponse> {
    return this.api.post('account-activation', payload, { skipAuth: true });
  }

  /**
   * Reactivate account via Videoflix API.
   * @param payload - The payload for the account reactivation.
   * @returns An Observable with the email response.
   */
  reactivateAccount(payload: EmailPayload): Observable<EmailResponse> {
    return this.api.post('account-reactivation', payload, { skipAuth: true });
  }

  /**
   * Log in via Videoflix API.
   * @param payload - The payload for the login.
   * @returns An Observable with the authentication response.
   */
  logIn(payload: LoginPayload): Observable<AuthResponse> {
    return this.api.post('login', payload, { skipAuth: true });
  }

  /**
   * Log out via Videoflix API.
   * @returns An Observable with no response.
   */
  logOut(): Observable<void> {
    return this.api.post('logout', {});
  }

  /**
   * Reset password via Videoflix API.
   * @param payload - The payload for the password reset.
   * @returns An Observable with the email response.
   */
  resetPassword(payload: EmailPayload): Observable<EmailResponse> {
    return this.api.post('password-reset', payload, { skipAuth: true });
  }

  /**
   * Update password via Videoflix API.
   * @param payload - The payload for the password update.
   * @returns An Observable with the user response.
   */
  updatePassword(payload: RegistrationPayload): Observable<UserResponse> {
    return this.api.post('password-update', payload);
  }

  /**
   * Deregister via Videoflix API.
   * @param payload - The payload for the deregistration.
   * @returns An Observable with the email response.
   */
  deregister(payload: LoginPayload): Observable<EmailResponse> {
    return this.api.post('deregistration', payload);
  }

  /**
   * Delete account via Videoflix API.
   * @returns An Observable with no response.
   */
  deleteAccount(): Observable<void> {
    return this.api.delete('account-deletion', this.token);
  }
}
