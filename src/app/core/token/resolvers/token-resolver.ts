import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn } from '@angular/router';

import { RouteUtils } from '@core/services';

/**
 * ResolveFn representing a token resolver.
 *
 * Resolves the data of a token check.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns True or a URL tree.
 */
export const tokenResolver: ResolveFn<string | number | RedirectCommand> = (
  route
) => {
  const utils = inject(RouteUtils);
  return utils.resolveToken(route, 'email');
};
