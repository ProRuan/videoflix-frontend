import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { VideoRouteUtils } from '../services';

/**
 * CanActivateFn representing an ID guard.
 *
 * Activates a component, if the route contains an ID.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns True or a URL tree.
 */
export const idGuard: CanActivateFn = (route) => {
  const utils = inject(VideoRouteUtils);
  return utils.checkId(route);
};
