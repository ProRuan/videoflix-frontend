import { Routes } from '@angular/router';

import { authGuard } from '@core/auth/guards';
import { authResolver } from '@core/auth/resolvers';

import { idGuard } from './guards';
import { VideoOffer, VideoPlayer } from './pages';
import { videoOfferResolver, videoPlayerResolver } from './resolvers';

export const videoRoutes: Routes = [
  {
    path: 'offer/:token',
    component: VideoOffer,
    canActivate: [authGuard],
    resolve: {
      response: authResolver,
      library: videoOfferResolver,
    },
  },
  {
    path: 'player/:token/:id',
    component: VideoPlayer,
    canActivate: [authGuard, idGuard],
    resolve: {
      response: authResolver,
      playableVideo: videoPlayerResolver,
    },
  },
];
