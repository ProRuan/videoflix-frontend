import { inject, Injectable } from '@angular/core';
import { Api } from '@shared/services/api';
import {
  AuthRequests,
  EmailPayload,
  LoginPayload,
  PasswordPayload,
  RegistrationPayload,
  TokenPayload,
} from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStore implements AuthRequests {
  api = inject(Api);

  [key: string]: any; // necessary ... ?

  // review and sort methods ...
  // think about methods, payloads and response interfaces ...

  /**
   * Request an email-check from the API.
   * @param payload - The email payload.
   * @returns An observable with the type EmailResponse.
   */
  checkEmail(payload: EmailPayload) {
    return this.api.post('email-check', payload);
  }

  /**
   * Request a registration from the API.
   * @param payload - The registration payload.
   * @returns An observable with the type AuthResponse.
   */
  register(payload: RegistrationPayload) {
    return this.api.post('registration', payload);
  }

  checkToken(payload: TokenPayload) {
    return this.api.post('token/check', payload);
  }

  activateAccount(payload: TokenPayload) {
    return this.api.post('account-activation', payload);
  }

  reactivateAccount(payload: EmailPayload) {
    return this.api.post('account-reactivation', payload);
  }

  deregister(payload: LoginPayload) {
    return this.api.post('deregistration', payload);
  }

  deleteAccount(payload: TokenPayload) {
    return this.api.post('account-deletion', payload);
  }

  /**
   * Request a login from the API.
   * @param payload - The login payload.
   * @returns An observable with the type AuthResponse.
   */
  logIn(payload: LoginPayload) {
    return this.api.post('login', payload);
  }

  // fix payload and response
  logOut(payload: TokenPayload): Observable<any> {
    return this.api.post<any>('logout', payload);
  }

  /**
   * Request a password reset from the API.
   * @param payload - The email payload.
   * @returns An observable with the type EmailResponse.
   */
  resetPassword(payload: EmailPayload) {
    return this.api.post('forgot-password', payload);
  }

  /**
   * Request a password update from the API.
   * @param payload - The password payload.
   * @returns An observable with the type AuthResponse.
   */
  updatePassword(payload: PasswordPayload) {
    return this.api.post('reset-password', payload);
  }

  requestUserEmail(payload: TokenPayload): Observable<any> {
    return this.api.post('user-email', payload);
  }
}
