import { Routes } from '@angular/router';

import { DELETION_TOKEN } from '@core/auth/constants';
import { tokenGuard } from '@core/auth/guards';
import { tokenResolver } from '@core/auth/resolvers';
import { TokenPage } from '@shared/components/pages';

import { DeleteAccount } from './delete-account';

export const deleteAccountRoutes: Routes = [
  {
    path: 'error',
    component: TokenPage,
    data: { config: DELETION_TOKEN.error },
  },
  {
    path: 'success',
    component: TokenPage,
    data: { config: DELETION_TOKEN.success },
  },
  {
    path: ':token',
    component: DeleteAccount,
    data: { parent: 'delete-account' },
    canActivate: [tokenGuard],
    resolve: { token: tokenResolver },
  },
  { path: '**', redirectTo: 'bad-request' },
];
