import { Routes } from '@angular/router';

import { authGuard } from '@core/auth/guards';
import { authResolver } from '@core/auth/resolvers';

import { SignOut } from './sign-out';

export const signOutRoutes: Routes = [
  {
    path: ':token',
    component: SignOut,
    canActivate: [authGuard],
    resolve: { response: authResolver },
  },
  { path: '**', redirectTo: 'unauthorized' },
];
