import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn } from '@angular/router';

import { RouteUtils } from '@core/services';

import { AuthResponse } from '../interfaces';

/**
 * ResolveFn representing an authentication resolver.
 *
 * Resolves the data of an authentication token check.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns The authentication response or a redirect command.
 */
export const authResolver: ResolveFn<AuthResponse | RedirectCommand> = (
  route
) => {
  const utils = inject(RouteUtils);
  return utils.resolveAuthToken(route);
};
