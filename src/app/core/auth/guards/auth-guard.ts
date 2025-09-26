import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { RouteUtils } from '@core/services';

/**
 * CanActivateFn representing an auth guard.
 *
 * Activates a component, if the route contains an authentication token.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns True or a URL tree.
 */
export const authGuard: CanActivateFn = (route) => {
  const utils = inject(RouteUtils);
  return utils.hasToken(route, 'unauthorized');
};
