import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';

import { SignOut } from './sign-out';

export const signOutRoutes: Routes = [
  {
    path: ':token',
    component: SignOut,
    canActivate: [tokenGuard],
    resolve: { response: TokenResolver },
  },
];
