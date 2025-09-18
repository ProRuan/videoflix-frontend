import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { AuthResponse } from '../interfaces';
import { TokenStore } from '../services';

/**
 * Class representing a token resolver.
 * @implements {Resolve}
 */
@Injectable({
  providedIn: 'root',
})
export class TokenResolver implements Resolve<AuthResponse> {
  tokenStore: TokenStore = inject(TokenStore);

  /**
   * Resolve token parameter to get a token check response.
   * @param route - The ActivatedRouteSnapshot.
   * @returns The token check response or a redirect command.
   */
  resolve(route: ActivatedRouteSnapshot) {
    return this.tokenStore.resolveToken(route);
  }
}
