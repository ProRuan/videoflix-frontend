import { Routes } from '@angular/router';
import { VideoOffer, VideoPlayer } from './pages';
import { tokenGuard } from '@core/token/guards';
import { VideoOfferResolver } from './resolvers';
import { videoGuard } from './guards';
import { VideoPlayerResolver } from './services/video-player-resolver';
import { CoreLayout } from '@core/layout';
import { VideoNotFound } from 'features/errors/pages/video-not-found/video-not-found';
import { authResolver } from '@core/auth/resolvers';

export const videoRoutes: Routes = [
  // change routes to video/offer, video/player etc.
  {
    path: 'offer/:token',
    component: VideoOffer,
    canActivate: [tokenGuard],
    resolve: {
      response: authResolver,
      library: VideoOfferResolver,
    },
  },
  {
    // add child ./error ...
    path: 'player/:token/:id',
    component: VideoPlayer,
    // add videoPlayerGuard ...
    // add resolver for token and id ...
    canActivate: [tokenGuard, videoGuard],
    resolve: { playableVideo: VideoPlayerResolver },
  },
  // { path: 'video/not-found', component: VideoNotFound },
  {
    path: ':token',
    component: CoreLayout,
    children: [{ path: 'not-found', component: VideoNotFound }],
  },
];
