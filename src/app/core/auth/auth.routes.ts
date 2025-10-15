import { Routes } from '@angular/router';

import { VIDEO_NOT_FOUND } from '@features/video/errors';
import { ErrorPage } from '@shared/components/pages';

import { authChildrenRoutes, authData } from './auth.config';
import {
  ForgotPassword,
  LogIn,
  ReactivateAccount,
  SignUp,
  Startsite,
} from './pages';

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

  { path: 'bad-request', component: ErrorPage, data: d.badRequest },
  { path: 'unauthorized', component: ErrorPage, data: d.unauthorized },
  { path: 'page-not-found', component: ErrorPage, data: d.pageNotFound },

  {
    path: 'video/not-found',
    component: ErrorPage,
    data: { config: VIDEO_NOT_FOUND },
  },
];
