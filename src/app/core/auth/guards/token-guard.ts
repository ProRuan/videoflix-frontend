import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { TokenStore } from '../services';

/**
 * CanActivateFn representing a token guard.
 *
 * Activates a component, if the route contains a short-lived token.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns True or a URL tree.
 */
export const tokenGuard: CanActivateFn = (route) => {
  const tokenStore = inject(TokenStore);
  return tokenStore.hasToken(route, ['/bad-request']);
};
