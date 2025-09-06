import { inject, Injectable } from '@angular/core';
import { Api } from '@shared/services/api';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  api = inject(Api);

  checkEmail(payload: any) {
    this.api.post('email-check', payload);
  }

  register(payload: any) {
    return this.api.post('registration', payload);
  }

  activateAccount(payload: any) {
    return this.api.post('account-activation', payload);
  }

  reactivateAccount(payload: any) {
    return this.api.post('account-reactivation', payload);
  }

  logIn(payload: any) {
    return this.api.post('login', payload);
  }

  logOut(payload: any) {
    return this.api.post('logout', payload);
  }

  resetPassword(payload: any) {
    return this.api.post('forgot-password', payload);
  }

  updatePassword(payload: any) {
    return this.api.post('reset-password', payload);
  }

  deregister(payload: any) {
    return this.api.post('deregistration', payload);
  }

  deleteAccount(payload: any) {
    return this.api.post('account-deletion', payload);
  }

  checkToken(payload: any) {
    return this.api.post('token/check', payload);
  }

  requestUserEmail(payload: any) {
    return this.api.post('user-email', payload);
  }
}
