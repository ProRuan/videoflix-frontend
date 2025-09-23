import { Routes } from '@angular/router';

import { TokenResolver } from '@core/auth/resolvers';
import { authGuard } from '@core/guards';

import { SignOut } from './sign-out';

// think about sign-out route ":error" or unauthorized ...

// short or invalid --> 401 - check
// not found or longer --> 401 ...

export const signOutRoutes: Routes = [
  {
    path: ':token',
    component: SignOut,
    canActivate: [authGuard],
    resolve: { email: TokenResolver },
  },
];
