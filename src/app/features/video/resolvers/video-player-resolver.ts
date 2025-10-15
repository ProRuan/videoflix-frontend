import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn } from '@angular/router';

import { PlayableVideo } from '../models';
import { VideoRouteUtils } from '../services';

/**
 * ResolveFn representing a video player resolver.
 *
 * Resolves the data of a video retrieval.
 *
 * @param route - The ActivatedRouteSnapshot.
 * @returns The playable video or a redirect command.
 */
export const videoPlayerResolver: ResolveFn<PlayableVideo | RedirectCommand> = (
  route
) => {
  const utils = inject(VideoRouteUtils);
  return utils.resolveVideo(route);
};
