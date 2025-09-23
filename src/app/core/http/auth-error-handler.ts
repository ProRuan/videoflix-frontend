import { Injectable } from '@angular/core';

import { ErrorToastConfig } from '@shared/interfaces';

/**
 * Class representing an authentication error handler service.
 *
 * Provides default and specific error toast configurations.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthErrorHandler {
  default: ErrorToastConfig = {
    status: 0,
    messages: ['Something went wrong.', 'Try again or contact support.'],
    button: {
      label: 'Contact support',
      route: '/imprint',
    },
  };

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

  logIn: ErrorToastConfig = {
    status: 400,
    messages: ['Please check your login data and try again.'],
  };

  signOut: ErrorToastConfig = {
    status: 400,
    messages: ['Couldn´t sign you out. Please try again.'],
  };
}
