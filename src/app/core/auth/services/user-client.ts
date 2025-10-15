import { inject, Injectable } from '@angular/core';

import { AuthResponse } from '../interfaces';

import { AuthStore } from './auth-store';

/**
 * Class representing a user client service.
 *
 * Manages a user´s data.
 */
@Injectable({
  providedIn: 'root',
})
export class UserClient {
  private auth = inject(AuthStore);

  startEmail: string = '';
  email: string = '';
  id: number = 0;

  /**
   * Get a user´s authentication token.
   * @returns The user´s authentication token.
   */
  get token() {
    return this.auth.getToken();
  }

  /**
   * Set the user´s authentication token.
   * @param value - The value to be set.
   */
  set token(value: string) {
    this.auth.setToken(value);
  }

  /**
   * Set the user data by response.
   * @param response - The authentication response.
   */
  set(response: AuthResponse) {
    this.email = response.email;
    this.id = response.user_id;
    this.token = response.token;
  }

  /**
   * Reset the user´s data.
   */
  reset() {
    this.email = '';
    this.id = 0;
    this.token = '';
  }
}
