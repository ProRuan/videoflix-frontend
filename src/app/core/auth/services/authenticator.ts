import { Injectable } from '@angular/core';

import {
  AuthRequests,
  EmailPayload,
  LoginPayload,
  PasswordPayload,
  RegistrationPayload,
  TokenPayload,
} from '@core/auth/interfaces';
import { ApiBase } from '@shared/services';

/**
 * Class representing an authenticator service.
 * @extends ApiBase
 * @implements {AuthRequests}
 */
@Injectable({
  providedIn: 'root',
})
export class Authenticator extends ApiBase implements AuthRequests {
  [key: string]: any;

  /**
   * Request an email-check from the API.
   * @param payload - The email payload.
   * @returns An observable with the type EmailResponse.
   */
  checkEmail(payload: EmailPayload) {
    return this.post('email-check', payload);
  }

  /**
   * Request a registration from the API.
   * @param payload - The registration payload.
   * @returns An observable with the type AuthResponse.
   */
  register(payload: RegistrationPayload) {
    return this.post('registration', payload);
  }

  checkToken(payload: TokenPayload) {
    return this.post('token/check', payload);
  }

  activateAccount(payload: TokenPayload) {
    return this.post('account-activation', payload);
  }

  reactivateAccount(payload: EmailPayload) {
    return this.post('account-reactivation', payload);
  }

  /**
   * Request a login from the API.
   * @param payload - The login payload.
   * @returns An observable with the type AuthResponse.
   */
  logIn(payload: LoginPayload) {
    return this.post('login', payload);
  }

  /**
   * Request a password reset from the API.
   * @param payload - The email payload.
   * @returns An observable with the type EmailResponse.
   */
  resetPassword(payload: EmailPayload) {
    return this.post('forgot-password', payload);
  }

  /**
   * Request a password update from the API.
   * @param payload - The password payload.
   * @returns An observable with the type AuthResponse.
   */
  updatePassword(payload: PasswordPayload) {
    return this.post('reset-password', payload);
  }
}
