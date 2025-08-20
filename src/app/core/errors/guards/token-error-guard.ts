import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { TokenStore } from '@core/auth/services';

/**
 * CanActivateFn representing a token error guard.
 *
 * Activates a component, if a token error is provided as URL parameter.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns True or a URL tree.
 */
export const tokenErrorGuard: CanActivateFn = (route) => {
  const tokenStore = inject(TokenStore);
  return tokenStore.hasTokenError(route);
};
