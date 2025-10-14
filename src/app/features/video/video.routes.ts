import { Routes } from '@angular/router';
import { VideoOffer, VideoPlayer } from './pages';

import { VideoOfferResolver } from './resolvers';
import { VideoPlayerResolver } from './services/video-player-resolver';
import { CoreLayout } from '@core/layout';
import { VideoNotFound } from 'features/errors/pages/video-not-found/video-not-found';
import { authResolver } from '@core/auth/resolvers';
import { idGuard } from './guards';
import { authGuard } from '@core/auth/guards';

// replace VideoOfferResolver with videoOfferResolver ...
// replace VideoPlayerResolver width videoPlayerResolver ...
// add resolver for auth data and video data (1/2) ...
// add error page ... ?
//   --> review features/errors ... !
// review token page ... ?

export const videoRoutes: Routes = [
  {
    path: 'offer/:token',
    component: VideoOffer,
    canActivate: [authGuard],
    resolve: {
      response: authResolver,
      library: VideoOfferResolver,
    },
  },
  {
    path: 'player/:token/:id',
    component: VideoPlayer,
    canActivate: [authGuard, idGuard],
    resolve: {
      playableVideo: VideoPlayerResolver,
    },
  },
  {
    path: ':token',
    component: CoreLayout,
    children: [{ path: 'not-found', component: VideoNotFound }],
  },
];
