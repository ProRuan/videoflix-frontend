import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { RouteUtils } from '@core/services';

/**
 * CanActivateFn representing a token guard.
 *
 * Activates a component, if the route contains a token.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns True or a URL tree.
 */
export const tokenGuard: CanActivateFn = (route) => {
  const utils = inject(RouteUtils);
  return utils.hasToken(route, 'bad-request');
};
