import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { TokenStore } from '@core/auth/services';

/**
 * CanActivateFn representing an auth guard.
 *
 * Activates a component, if the route contains an authentication token.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns True or a URL tree.
 */
export const authGuard: CanActivateFn = (route) => {
  const tokenStore = inject(TokenStore);
  return tokenStore.hasToken(route, ['/unauthorized']);
};
