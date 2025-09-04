export const DELETION_TOKEN = {
  error: {
    title: 'Token rejected',
    color: 'c-error',
    messages: [
      'This deletion link can no longer be used.',
      'Log in and sign out again.',
    ],
    primText: 'Go to login',
    primRoute: '/log-in',
  },
  success: {
    title: 'Account deleted',
    color: 'c-success',
    messages: [
      'Your account has been deleted.',
      'You can now go home or create a new account.',
    ],
    primText: 'Go to home',
    primRoute: '/',
    secText: 'Go to sign-up',
    secRoute: '/sign-up',
  },
};
