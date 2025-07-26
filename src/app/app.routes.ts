import { Routes } from '@angular/router';
import { Startsite } from './components/startsite/startsite';
import { LogIn } from './components/log-in/log-in';
import { SignUp } from './components/sign-up/sign-up';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { ResetPassword } from './components/reset-password/reset-password';
import { VideoOffer } from './components/video-offer/video-offer';
import { VideoPlayer } from './components/video-player/video-player';
import { Imprint } from './components/imprint/imprint';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';

// reset-password with user token ... ?
// video-offer with user token ... !
// video-player with user token ... !

// user router guard ... ?!

export const routes: Routes = [
  { path: '', component: Startsite },
  { path: 'log-in', component: LogIn },
  { path: 'sign-up', component: SignUp },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'video-offer', component: VideoOffer },
  { path: 'video-player', component: VideoPlayer },
  { path: 'imprint', component: Imprint },
  { path: 'privacy-policy', component: PrivacyPolicy },
];
