import { inject, Injectable } from '@angular/core';
import { Api } from '@shared/services/api';
import {
  AuthRequests,
  EmailPayload,
  LoginPayload,
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
  // update endpoint names, payloads, responses and comments ...
  // fix all buttons and links for multiple execution ...

  // new endpoint checklist (10/10) + (2/2) - check
  // ----------------------
  // checkEmail() - check
  // register() - check
  // activateAccount() - check
  // reactivateAccount() - check
  // logIn() - check
  // logOut() - check
  // resetPassword() - check
  // updatePassword() - check
  // deregister() - check
  // deleteAccount() - check

  // checkActivationToken() - check
  // checkToken() - check

  private token: string = '';

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  checkEmail(payload: EmailPayload) {
    return this.api.post('email-check', payload, { skipAuth: true });
  }

  register(payload: RegistrationPayload) {
    return this.api.post('registration', payload, { skipAuth: true });
  }

  activateAccount(payload: TokenPayload) {
    return this.api.post('account-activation', payload, { skipAuth: true });
  }

  reactivateAccount(payload: EmailPayload) {
    return this.api.post('account-reactivation', payload, { skipAuth: true });
  }

  logIn(payload: LoginPayload) {
    return this.api.post('login', payload, { skipAuth: true });
  }

  // logout as header click function ... ?
  logOut(token: string): Observable<any> {
    return this.api.post<any>('logout', {});
  }

  resetPassword(payload: EmailPayload) {
    return this.api.post('password-reset', payload, { skipAuth: true });
  }

  updatePassword(payload: RegistrationPayload) {
    return this.api.post('password-update', payload);
  }

  deregister(payload: LoginPayload) {
    return this.api.post('deregistration', payload);
  }

  deleteAccount() {
    return this.api.delete('account-deletion', this.token);
  }

  checkActivationToken(token: string) {
    return this.api.post(
      'token/activation-token-check',
      { token },
      { skipAuth: true }
    );
  }

  checkToken() {
    return this.api.post('token/token-check', {});
  }
}
