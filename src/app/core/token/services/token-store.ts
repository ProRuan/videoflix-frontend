import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthResponse } from '@core/auth/interfaces';
import { Api } from '@shared/services/api';

/**
 * Class representing a token store service.
 *
 * Provides methods for token checks via Videoflix API.
 */
@Injectable({
  providedIn: 'root',
})
export class TokenStore {
  private api = inject(Api);

  /**
   * Check an activation token via Videoflix API.
   * @param token - The token to be checked.
   * @returns An Observable with the authentication response.
   */
  checkActivationToken(token: string): Observable<AuthResponse> {
    return this.api.post(
      'token/activation-token-check',
      { token },
      { skipAuth: true }
    );
  }

  /**
   * Check a token via Videoflix API.
   * @param token - The token to be checked.
   * @returns An Observable with the authentication response.
   */
  checkToken(): Observable<AuthResponse> {
    return this.api.post('token/token-check', {});
  }
}
