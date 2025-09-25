import { AuthToastConfig } from '../interfaces';

export const AUTH_TOAST_CONFIG: AuthToastConfig = {
  default: {
    status: 0,
    messages: ['Something went wrong.', 'Try again or contact support.'],
    label: 'Contact support',
    url: '/imprint',
  },
  startsite: {
    status: 400,
    messages: [
      'Please check your email and try again.',
      'Need to activate your account?',
    ],
    label: 'Activate account',
    url: '/reactivate-account',
  },
  signUp: {
    status: 400,
    messages: [
      'Please check your input and try again.',
      'Already have an account?',
    ],
    label: 'Activate account',
    url: '/reactivate-account',
  },
  logIn: {
    status: 400,
    messages: ['Please check your login data and try again.'],
  },
  signOut: {
    status: 400,
    messages: ['Couldn´t sign you out. Please try again.'],
  },
};
