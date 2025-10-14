import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn } from '@angular/router';

import { RouteUtils } from '@core/services';

/**
 * ResolveFn representing an activation token resolver.
 *
 * Resolves the data of an activation token check.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns String, number or redirect command.
 */
export const activationTokenResolver: ResolveFn<
  string | number | RedirectCommand
> = (route) => {
  const utils = inject(RouteUtils);
  return utils.resolveToken(route, 'token', true);
};
