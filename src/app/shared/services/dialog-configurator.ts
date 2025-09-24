import { Injectable } from '@angular/core';

import { SuccessDialogConfig } from '@core/auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DialogConfigurator {
  readonly signUp: SuccessDialogConfig = {
    title: 'Registration successful',
    messages: [
      'Thank you for registering!',
      `We’ve sent a confirmation email to your inbox.
       Please click the activation link inside to unlock your account.`,
    ],
  };

  readonly reactivateAccount: SuccessDialogConfig = {
    title: 'Email sent',
    messages: [
      'We’ve sent you an account activation link.',
      'Check your inbox and click the link to reactivate your account.',
    ],
  };

  readonly forgotPassword: SuccessDialogConfig = {
    title: 'Email sent',
    messages: [
      'We’ve sent you a password reset link.',
      'Check your inbox and click the link to choose a new password.',
    ],
  };

  readonly signOut: SuccessDialogConfig = {
    title: 'Email sent',
    messages: [
      'We’ve sent you an account deletion link.',
      'Check your inbox and click the link to delete your account.',
    ],
  };
}
