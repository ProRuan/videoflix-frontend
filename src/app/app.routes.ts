import { Routes } from '@angular/router';

import { authRoutes } from '@core/auth/auth.routes';
import { CoreLayout } from '@core/layout';
import { Imprint, PrivacyPolicy } from '@core/static/pages';
import { videoRoutes } from '@features/video/video.routes';

export const routes: Routes = [
  { path: '', component: CoreLayout, children: authRoutes },
  { path: 'video', children: videoRoutes },
  { path: 'imprint', component: Imprint },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: '**', redirectTo: 'page-not-found' },
];
