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

// generate imprint and privacy policy ...

// improve/move this
// avoid { bg: startsite } and so on at the route

const bg = {
  startsite: `linear-gradient(
  180deg,
  #000000 -19.89%,
  rgba(0, 0, 0, 0.55) 40.46%,
  #000000 100%
  ),
  url('/images/backgrounds/startsite_bg.jpg')`,
  signUp: `linear-gradient(
  180deg,
  rgba(0, 0, 0, 0.8) -27.44%,
  rgba(0, 0, 0, 0.44) 44.23%,
  rgba(0, 0, 0, 0.8) 100%
  ), url('/images/backgrounds/sign_up_bg.jpg')`,
  logIn: `linear-gradient(
  180deg,
  rgba(0, 0, 0, 0.8) -27.44%,
  rgba(0, 0, 0, 0.44) 44.23%,
  rgba(0, 0, 0, 0.8) 100%
  ), url('/images/backgrounds/log_in_bg.jpg')`,
};

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
      { path: '', component: Startsite, data: { bg: bg.startsite } },
      { path: 'sign-up', component: SignUp, data: { bg: bg.signUp } },
      {
        path: 'activate-account/error',
        component: ActivateAccountError,
        data: { bg: bg.signUp },
      },
      {
        path: 'activate-account/success',
        component: ActivateAccountSuccess,
        data: { bg: bg.signUp },
      },
      {
        path: 'activate-account/:token',
        component: ActivateAccount,
        canActivate: [tokenGuard],
        // add token resolver (with with right error page)!
        resolve: { response: TokenResolver },
        data: { bg: bg.signUp },
      },
      {
        path: 'reactivate-account',
        component: ReactivateAccount,
        data: { bg: bg.signUp },
      },
      { path: 'log-in', component: LogIn, data: { bg: bg.logIn } },
      {
        path: 'forgot-password',
        component: ForgotPassword,
        data: { bg: bg.logIn },
      },
      {
        path: 'reset-password/error',
        component: ResetPasswordError,
        data: { bg: bg.logIn },
      },
      {
        path: 'reset-password/success',
        component: ResetPasswordSuccess,
        data: { bg: bg.logIn },
      },
      {
        path: 'reset-password/:token',
        component: ResetPassword,
        canActivate: [tokenGuard],
        resolve: { response: TokenResolver },
        data: { bg: bg.logIn },
      },
      // must be with token
      {
        path: 'sign-out/:token',
        component: SignOut,
        canActivate: [tokenGuard],
        resolve: { response: EmailResolver },
        data: { bg: bg.signUp },
      },
      {
        path: 'delete-account/error',
        component: DeleteAccountError,
        data: { bg: bg.signUp },
      },
      {
        path: 'delete-account/success',
        component: DeleteAccountSuccess,
        data: { bg: bg.signUp },
      },
      {
        path: 'delete-account/:token',
        component: DeleteAccount,
        canActivate: [tokenGuard],
        resolve: { response: TokenResolver },
        data: { bg: bg.signUp },
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
        resolve: { playableVideoData: VideoPlayerResolver },
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
