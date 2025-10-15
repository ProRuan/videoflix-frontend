import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn } from '@angular/router';

import { VideoGroup } from '../interfaces';
import { VideoRouteUtils } from '../services';

/**
 * ResolveFn representing a video offer resolver.
 *
 * Resolves the data of a video listing request.
 *
 * @returns The video group array or a redirect command.
 */
export const videoOfferResolver: ResolveFn<VideoGroup[] | RedirectCommand> = (
  route
) => {
  const utils = inject(VideoRouteUtils);
  return utils.resolveVideoList();
};
