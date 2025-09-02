import { Routes } from '@angular/router';

import { CoreLayout } from '@core/layout';
import {
  Startsite,
  SignUp,
  LogIn,
  ForgotPassword,
  ResetPassword,
} from '@core/auth/pages';
import { AuthenticationRequired, PageNotFound } from '@core/errors/pages';
import { Imprint, PrivacyPolicy } from '@core/static/pages';
import { VideoOffer, VideoPlayer } from '@features/video/pages';

// sort + index.ts
import { VideoPlayerResolver } from '@features/video/services/video-player-resolver';
import { tokenGuard } from '@core/auth/guards';
import { TokenResolver } from '@core/auth/resolvers';
import { ResetPasswordError } from '@core/auth/pages/reset-password/reset-password-error/reset-password-error';
import { ResetPasswordSuccess } from '@core/auth/pages/reset-password/reset-password-success/reset-password-success';
import { ActivateAccount } from '@core/auth/pages/activate-account/activate-account';
import { ActivateAccountError } from '@core/auth/pages/activate-account/activate-account-error/activate-account-error';
import { ActivateAccountSuccess } from '@core/auth/pages/activate-account/activate-account-success/activate-account-success';
import { ReactivateAccount } from '@core/auth/pages/reactivate-account/reactivate-account';
import { SignOut } from '@core/auth/pages/sign-out/sign-out';
import { DeleteAccount } from '@core/auth/pages/delete-account/delete-account';
import { DeleteAccountError } from '@core/auth/pages/delete-account/delete-account-error/delete-account-error';
import { DeleteAccountSuccess } from '@core/auth/pages/delete-account/delete-account-success/delete-account-success';
import { EmailResolver } from '@core/auth/resolvers/email-resolver';
import { VideoOfferResolver } from '@features/video/resolvers';
import { videoGuard } from '@features/video/guards/video-guard';
import { VideoNotFound } from 'features/errors/pages/video-not-found/video-not-found';
import { Themes } from '@shared/constants';

// generate imprint and privacy policy ...

// reset-password with user token ... ?
// video-offer with user token ... !
// video-player with user token ... !

// user router guard ... ?!
// use router resolver ... ?
// use (http) interceptor ... ?

// improve concept of video player guard + resolver ...

// error layout, e. g. /errors/token/:error ... ?

// map resolved data, e. g. res => res.token ... !
// use more resolvers, e. g. { token: TokenResolver, email: EmailResolver } ...

export const routes: Routes = [
  {
    path: '',
    component: CoreLayout,
    children: [
      { path: '', component: Startsite, data: { theme: Themes.Startsite } },
      { path: 'sign-up', component: SignUp, data: { theme: Themes.SignUp } },
      {
        path: 'activate-account/error',
        component: ActivateAccountError,
        data: { theme: Themes.SignUp },
      },
      {
        path: 'activate-account/success',
        component: ActivateAccountSuccess,
        data: { theme: Themes.SignUp },
      },
      {
        path: 'activate-account/:token',
        component: ActivateAccount,
        canActivate: [tokenGuard],
        // add token resolver (with with right error page)!
        resolve: { response: TokenResolver },
        data: { theme: Themes.SignUp },
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
        path: 'reset-password/error',
        component: ResetPasswordError,
        data: { theme: Themes.Login },
      },
      {
        path: 'reset-password/success',
        component: ResetPasswordSuccess,
        data: { theme: Themes.Login },
      },
      {
        path: 'reset-password/:token',
        component: ResetPassword,
        canActivate: [tokenGuard],
        resolve: { response: TokenResolver },
        data: { theme: Themes.Login },
      },
      // must be with token
      {
        path: 'sign-out/:token',
        component: SignOut,
        canActivate: [tokenGuard],
        resolve: { response: EmailResolver },
        data: { theme: Themes.SignUp },
      },
      {
        path: 'delete-account/error',
        component: DeleteAccountError,
        data: { theme: Themes.SignUp },
      },
      {
        path: 'delete-account/success',
        component: DeleteAccountSuccess,
        data: { theme: Themes.SignUp },
      },
      {
        path: 'delete-account/:token',
        component: DeleteAccount,
        canActivate: [tokenGuard],
        resolve: { response: TokenResolver },
        data: { theme: Themes.SignUp },
      },
      { path: 'imprint', component: Imprint },
      { path: 'privacy-policy', component: PrivacyPolicy },
      { path: 'authentication-required', component: AuthenticationRequired },
      { path: 'page-not-found', component: PageNotFound },
    ],
  },

  // change routes to video/offer, video/player etc.
  {
    path: 'video-offer/:token',
    component: VideoOffer,
    canActivate: [tokenGuard],
    resolve: { result: VideoOfferResolver },
  },
  {
    // add child ./error ...
    path: 'video-player',
    children: [
      {
        path: ':token/:id',
        component: VideoPlayer,
        // add videoPlayerGuard ...
        // add resolver for token and id ...
        canActivate: [tokenGuard, videoGuard],
        resolve: { playableVideo: VideoPlayerResolver },
      },
    ],
  },
  // { path: 'video/not-found', component: VideoNotFound },
  {
    path: 'video/:token',
    component: CoreLayout,
    children: [{ path: 'not-found', component: VideoNotFound }],
  },
];
