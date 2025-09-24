import { AuthDialogConfig } from '../interfaces';

export const AUTH_DIALOG_CONFIG: AuthDialogConfig = {
  signUp: {
    title: 'Registration successful',
    messages: [
      'Thank you for registering!',
      `We’ve sent a confirmation email to your inbox.
           Please click the activation link inside to unlock your account.`,
    ],
  },
  reactivateAccount: {
    title: 'Email sent',
    messages: [
      'We’ve sent you an account activation link.',
      'Check your inbox and click the link to reactivate your account.',
    ],
  },
  forgotPassword: {
    title: 'Email sent',
    messages: [
      'We’ve sent you a password reset link.',
      'Check your inbox and click the link to choose a new password.',
    ],
  },
  signOut: {
    title: 'Email sent',
    messages: [
      'We’ve sent you an account deletion link.',
      'Check your inbox and click the link to delete your account.',
    ],
  },
};
