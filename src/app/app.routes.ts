import { Routes } from '@angular/router';

import { authData } from '@core/auth';
import { Startsite } from '@core/auth/pages';
import { CoreLayout } from '@core/layout';
import { Imprint, PrivacyPolicy } from '@core/static/pages';

export const routes: Routes = [
  {
    path: '',
    component: CoreLayout,
    children: [
      { path: '', component: Startsite, data: authData.startsite },
      {
        path: '',
        loadChildren: () =>
          import('@core/auth/auth.routes').then((m) => m.authRoutes),
      },
    ],
  },
  {
    path: 'video',
    loadChildren: () =>
      import('@features/video/video.routes').then((m) => m.videoRoutes),
  },
  { path: 'imprint', component: Imprint },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: '**', redirectTo: 'page-not-found' },
];
