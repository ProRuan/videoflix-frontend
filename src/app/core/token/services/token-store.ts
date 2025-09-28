import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthResponse } from '@core/auth/interfaces';
import { BaseStore } from '@shared/services';

/**
 * Class representing a token store service.
 *
 * Provides methods for Videoflix API token checks.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenStore {
  private store = inject(BaseStore);

  /**
   * Check activation token via Videoflix API.
   * @param token - The token to be checked.
   * @returns An Observable with the authentication response.
   */
  checkActivationToken(token: string): Observable<AuthResponse> {
    return this.store.post(
      'token/activation-token-check',
      { token },
      { skipAuth: true }
    );
  }

  /**
   * Check token via Videoflix API.
   * @param token - The token to be checked.
   * @returns An Observable with the authentication response.
   */
  checkToken(): Observable<AuthResponse> {
    return this.store.post('token/token-check', {});
  }
}
