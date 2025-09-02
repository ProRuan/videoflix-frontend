import { Routes } from '@angular/router';

import { Themes } from '@shared/constants';

import {
  ForgotPassword,
  LogIn,
  ReactivateAccount,
  SignOut,
  SignUp,
  Startsite,
} from './pages';

// clean imports + index.ts
import { tokenGuard } from './guards';
import { EmailResolver } from './resolvers/email-resolver';
import { Imprint, PrivacyPolicy } from '../static';
import { AuthenticationRequired, PageNotFound } from '../errors';
import { resetPasswordRoutes } from './pages/reset-password/reset-password.routes';
import { activateAccountRoutes } from './pages/activate-account/activate-account.routes';
import { deleteAccountRoutes } from './pages/delete-account/delete-account.routes';

// own routes for other page types ...
// own subroutes for children ... ?

// try to make one line, e. g. with data: themes.signUp ...

export const authRoutes: Routes = [
  { path: '', component: Startsite, data: { theme: Themes.Startsite } },
  { path: 'sign-up', component: SignUp, data: { theme: Themes.SignUp } },
  {
    path: 'activate-account',
    data: { theme: Themes.SignUp },
    children: activateAccountRoutes,
  },
  {
    path: 'reactivate-account',
    component: ReactivateAccount,
    data: { theme: Themes.SignUp },
  },
  { path: 'log-in', component: LogIn, data: { theme: Themes.Login } },
  {
    path: 'forgot-password',
    component: ForgotPassword,
    data: { theme: Themes.Login },
  },
  {
    path: 'reset-password',
    data: { theme: Themes.Login },
    children: resetPasswordRoutes,
  },
  {
    path: 'sign-out/:token',
    component: SignOut,
    canActivate: [tokenGuard],
    resolve: { response: EmailResolver },
    data: { theme: Themes.SignUp },
  },
  {
    path: 'delete-account',
    data: { theme: Themes.SignUp },
    children: deleteAccountRoutes,
  },
  { path: 'imprint', component: Imprint },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'authentication-required', component: AuthenticationRequired },
  { path: 'page-not-found', component: PageNotFound },
];
