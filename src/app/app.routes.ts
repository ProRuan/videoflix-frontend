import { Routes } from '@angular/router';

// review imports
import { CoreLayout } from '@core/layout';
import { authRoutes } from '@core/auth/auth.routes';
import { Imprint, PrivacyPolicy } from '@core/static/pages';
import { videoRoutes } from '@features/video/video.routes';

// generate video layout ... ?

// PageNotFound with second button ...
//   - replace url and go one step back ... ?

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
  { path: 'imprint', component: Imprint },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: '**', redirectTo: 'page-not-found' },
];
