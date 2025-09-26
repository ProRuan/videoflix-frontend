import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn } from '@angular/router';

import { RouteUtils } from '@core/services';

/**
 * ResolveFn representing an authentication resolver.
 *
 * Resolves the data of an authentication token check.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns True or a URL tree.
 */
export const authResolver: ResolveFn<string | RedirectCommand> = (route) => {
  const utils = inject(RouteUtils);
  return utils.resolveAuthToken(route);
};
