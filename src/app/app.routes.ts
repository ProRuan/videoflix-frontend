import { Routes } from '@angular/router';

import { CoreLayout } from '@core/layout';
import {
  Startsite,
  SignUp,
  LogIn,
  ForgotPassword,
  ResetPassword,
} from '@core/auth/pages';
import { Imprint, PrivacyPolicy } from '@core/static/pages';
import { VideoOffer, VideoPlayer } from '@features/video/pages';

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

export const routes: Routes = [
  {
    path: '',
    component: CoreLayout,
    children: [
      { path: '', component: Startsite, data: { bg: bg.startsite } },
      { path: 'sign-up', component: SignUp, data: { bg: bg.signUp } },
      { path: 'log-in', component: LogIn, data: { bg: bg.logIn } },
      {
        path: 'forgot-password',
        component: ForgotPassword,
        data: { bg: bg.logIn },
      },
      {
        path: 'reset-password',
        component: ResetPassword,
        data: { bg: bg.logIn },
      },
      { path: 'imprint', component: Imprint },
      { path: 'privacy-policy', component: PrivacyPolicy },
    ],
  },

  { path: 'video-offer', component: VideoOffer },
  { path: 'video-player', component: VideoPlayer },
];
