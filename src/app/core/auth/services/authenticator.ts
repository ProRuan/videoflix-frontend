import { Injectable } from '@angular/core';
import { ApiBase } from '@shared/services/api-base';

import {
  EmailPayload,
  LoginPayload,
  PasswordPayload,
  RegistrationPayload,
} from '@core/auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class Authenticator extends ApiBase {
  [key: string]: any;
  // get method names ...
  // add video-store and video-progress-store ...
  // move services to right folders ...

  checkEmail(payload: EmailPayload) {
    return this.post('email-check', payload);
  }

  register(payload: RegistrationPayload) {
    return this.post('registration', payload);
  }

  logIn(payload: LoginPayload) {
    return this.post('login', payload);
  }

  resetPassword(payload: EmailPayload) {
    return this.post('forgot-password', payload);
  }

  // reset-password payload: token or email is missing for status code 200 ...
  // token must be variable!
  // think about payload!
  updatePassword(payload: PasswordPayload) {
    return this.post('reset-password', payload, true);
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
