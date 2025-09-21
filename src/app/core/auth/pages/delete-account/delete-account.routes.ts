import { Routes } from '@angular/router';

import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';
import { DELETION_TOKEN, TokenPage } from '@shared/modules/token-page';

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
    resolve: { token: TokenResolver },
  },
  { path: '**', redirectTo: 'bad-request' },
];
