import { Routes } from '@angular/router';

import { CoreLayout } from '@core/layout';

import { authRoutes } from '@core/auth/auth.routes';
import { videoRoutes } from '@features/video/video.routes';

// generate video layout ... ?

// guide
// -----
// move data to parents ...
// choose consitent keys for resolved data ...
// add wild card ...
// add lazy loading (e. g. video) ...
// update router guards and route resolver redirections ...

// generate imprint and privacy policy ...

// improve concept of video player guard + resolver ...

// map resolved data, e. g. res => res.token ... !
// use more resolvers, e. g. { token: TokenResolver, email: EmailResolver } ...

export const routes: Routes = [
  { path: '', component: CoreLayout, children: authRoutes },
  { path: 'video', children: videoRoutes },
];
