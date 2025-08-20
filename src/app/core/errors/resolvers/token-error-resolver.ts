import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { TokenStore } from '@core/auth/services';

/**
 * Class representing a token error resolver.
 * @implements {Resolve}
 */
@Injectable({
  providedIn: 'root',
})
export class TokenErrorResolver implements Resolve<string> {
  tokenStore: TokenStore = inject(TokenStore);

  /**
   * Resolve an error parameter to get an error key.
   * @param route - The ActivatedRouteSnapshot.
   * @returns The error key as string.
   */
  resolve(route: ActivatedRouteSnapshot) {
    return this.tokenStore.resolveTokenError(route);
  }
}
