export const RESET_TOKEN = {
  error: {
    title: 'Token rejected',
    color: 'c-error',
    messages: [
      'This reset link can no longer be used.',
      'Request a new token or go to login.',
    ],
    primText: 'Get new token',
    primRoute: '/forgot-password',
    secText: 'Go to login',
    secRoute: '/log-in',
  },
  success: {
    title: 'Password successfully reset',
    color: 'c-success',
    messages: [
      'Your password has been reset.',
      'You can now log in with your new password.',
    ],
    primText: 'Go to login',
    primRoute: '/log-in',
  },
};
