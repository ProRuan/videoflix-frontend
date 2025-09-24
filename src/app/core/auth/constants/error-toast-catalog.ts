import { ErrorToastCatalog } from '../interfaces';

export const ERROR_TOAST_CATALOG: ErrorToastCatalog = {
  default: {
    status: 0,
    messages: ['Something went wrong.', 'Try again or contact support.'],
    button: {
      label: 'Contact support',
      route: '/imprint',
    },
  },
  startsite: {
    status: 400,
    messages: [
      'Please check your email and try again.',
      'Need to activate your account?',
    ],
    button: {
      label: 'Activate account',
      route: '/reactivate-account',
    },
  },
  signUp: {
    status: 400,
    messages: [
      'Please check your input and try again.',
      'Already have an account?',
    ],
    button: {
      label: 'Activate account',
      route: '/reactivate-account',
    },
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
