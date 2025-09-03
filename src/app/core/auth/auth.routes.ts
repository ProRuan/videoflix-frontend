import { Routes } from '@angular/router';

import {
  ForgotPassword,
  LogIn,
  ReactivateAccount,
  SignUp,
  Startsite,
} from './pages';

// clean imports + index.ts
import { Imprint, PrivacyPolicy } from '../static';
import { AuthenticationRequired, PageNotFound } from '../errors';
import { authChildrenRoutes, authData } from './auth.config';

// own routes for other page types ...
// own subroutes for children ... ?
// rename reactivate-account ... ?
// rename authentication-required ...

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

  { path: 'authentication-required', component: AuthenticationRequired },
  { path: 'page-not-found', component: PageNotFound },
];
