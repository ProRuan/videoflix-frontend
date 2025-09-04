import { Routes } from '@angular/router';

// review imports + index.ts
import { ErrorPage } from '@core/error';
import { Imprint, PrivacyPolicy } from '@core/static/pages';

import {
  ForgotPassword,
  LogIn,
  ReactivateAccount,
  SignUp,
  Startsite,
} from './pages';

import { authChildrenRoutes, authData } from './auth.config';

// own routes for other page types ...
// own subroutes for children ... ?
// rename reactivate-account ... ?
// rename authentication-required ...

// move token interfaces into a folder ...
// move token state page logic to core ... ?

const d = authData;
const r = authChildrenRoutes;

export const authRoutes: Routes = [
  { path: '', component: Startsite, data: d.startsite },
  { path: 'sign-up', component: SignUp, data: d.signUp },
  { path: 'activate-account', data: d.signUp, children: r.activateAccount },
  { path: 'reactivate-account', component: ReactivateAccount, data: d.signUp },
  { path: 'log-in', component: LogIn, data: d.login },
  { path: 'forgot-password', component: ForgotPassword, data: d.login },
  { path: 'reset-password', data: d.login, children: r.resetPassword },
  { path: 'sign-out', data: d.signUp, children: r.signOut },
  { path: 'delete-account', data: d.signUp, children: r.deleteAccount },

  { path: 'imprint', component: Imprint },
  { path: 'privacy-policy', component: PrivacyPolicy },

  { path: 'unauthorized', component: ErrorPage, data: d.unauthorized },
  { path: 'page-not-found', component: ErrorPage, data: d.pageNotFound },
];
