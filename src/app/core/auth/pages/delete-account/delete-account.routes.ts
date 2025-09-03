import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';
import { TokenStatePage } from '@shared/components/pages';

import { DeleteAccount } from './delete-account';

export const deleteAccountRoutes: Routes = [
  {
    path: 'error',
    component: TokenStatePage,
    data: { page: 'deleteAccount', state: 'error' },
  },
  {
    path: 'success',
    component: TokenStatePage,
    data: { page: 'deleteAccount', state: 'success' },
  },
  {
    path: ':token',
    component: DeleteAccount,
    canActivate: [tokenGuard],
    resolve: { response: TokenResolver },
  },
];
