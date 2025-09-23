import { Injectable } from '@angular/core';
import { ErrorToastConfig } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthErrorHandler {
  default = {
    status: 0,
    messages: ['Something went wrong.', 'Try again or contact support.'],
    button: {
      label: 'Contact support',
      route: '/imprint',
    },
  };

  // rename to AuthErrorConfigurator ...
  // remove default ...
  // remove configurations which use default ...

  constructor() {}

  startsite: ErrorToastConfig = {
    status: 400,
    messages: [
      'Please check your email and try again.',
      'Need to activate your account?',
    ],
    button: {
      label: 'Activate account',
      route: '/reactivate-account',
    },
  };

  signUp: ErrorToastConfig = {
    status: 400,
    messages: [
      'Please check your input and try again.',
      'Already have an account?',
    ],
    button: {
      label: 'Activate account',
      route: '/reactivate-account',
    },
  };

  activateAccount = this.default;

  reactivateAccount = this.default;

  logIn: ErrorToastConfig = {
    status: 400,
    messages: ['Please check your login data and try again.'],
  };

  forgotPassword = this.default;

  resetPassword = this.default;

  signOut = {
    status: 400,
    messages: ['Couldn´t sign you out. Please try again.'],
  };

  deleteAccount = this.default;
}
