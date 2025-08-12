import { Injectable } from '@angular/core';
import { ApiBase } from '@shared/services/api-base';

import {
  EmailPayload,
  LoginPayload,
  RegistrationPayload,
  ResetPasswordPayload,
} from '@core/auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Authenticator extends ApiBase {
  // get method names ...
  // add video-store and video-progress-store ...
  // move services to right folders ...

  checkEmail(payload: EmailPayload) {
    this.post('email-check', payload);
  }

  register(payload: RegistrationPayload) {
    this.post('registration', payload);
  }

  logIn(payload: LoginPayload) {
    this.post('login', payload);
  }

  resetPassword(payload: EmailPayload) {
    this.post('forgot-password', payload);
  }

  // token must be variable!
  // think about payload!
  updatePassword(payload: ResetPasswordPayload) {
    this.post('reset-password', payload, true);
  }

  // naming
  // video-store ... !
  // video-progress-store ... !

  // video-servcie
  // -------------
  // listVideos
  // getVideo

  // video-progress-service
  // ----------------------
  // get, add, update, delete
}
