import { AuthDialogConfig } from '../interfaces';

export const AUTH_DIALOG_CONFIG: AuthDialogConfig = {
  signUp: {
    title: 'Registration successful',
    messages: [
      'Thank you for registering!',
      `We’ve sent a confirmation email to your inbox.
           Please click the activation link inside to unlock your account.`,
    ],
    label: 'Log in',
    url: 'log-in',
  },
  reactivateAccount: {
    title: 'Email sent',
    messages: [
      'We’ve sent you an account activation link.',
      'Check your inbox and click the link to reactivate your account.',
    ],
    label: 'Log in',
    url: 'log-in',
  },
  forgotPassword: {
    title: 'Email sent',
    messages: [
      'We’ve sent you a password reset link.',
      'Check your inbox and click the link to choose a new password.',
    ],
    label: 'Log in',
    url: 'log-in',
  },
  signOut: {
    title: 'Email sent',
    messages: [
      'We’ve sent you an account deletion link.',
      'Check your inbox and click the link to delete your account.',
    ],
    label: 'Video offer',
    url: 'video/offer',
  },
};
