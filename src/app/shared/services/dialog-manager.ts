import { Injectable, signal } from '@angular/core';
import { OverlayManager } from '../models/overlay-manager';
import { DialogIds } from '../ts/enums';
import { SuccessDialogConfig } from '../interfaces/success-dialog-config';

@Injectable({
  providedIn: 'root',
})
export class DialogManager extends OverlayManager {
  protected openState = signal<Record<string, boolean>>({
    [DialogIds.SignUpSuccess]: false,
    [DialogIds.ForgotPasswordSuccess]: false,
  });
  private zoomOutState = signal<Record<string, boolean>>({
    [DialogIds.SignUpSuccess]: false,
    [DialogIds.ForgotPasswordSuccess]: false,
  });

  config!: SuccessDialogConfig;

  configurations: { [key: string]: SuccessDialogConfig } = {
    [DialogIds.SignUpSuccess]: {
      title: 'Registration successful',
      messages: [
        'Thank you for registering!',
        `We’ve sent a confirmation email to your inbox.
              Please click the activation link inside to unlock your account.`,
      ],
    },
    [DialogIds.ForgotPasswordSuccess]: {
      title: 'Email Sent',
      messages: [
        'We’ve sent you a password‑reset link.',
        'Check your inbox and click the link to choose a new password.',
      ],
    },
    [DialogIds.ResetPasswordSuccess]: {
      title: 'Password Reset Successful',
      messages: [
        'Your password has been updated.',
        'You can now use your new password to log in.',
      ],
    },
  };

  // config: SuccessDialogConfig = {
  //   title: 'Registration successful',
  //   messages: [
  //     'Thank you for registering!',
  //     `We’ve sent a confirmation email to your inbox.
  //             Please click the activation link inside to unlock your account.`,
  //   ],
  // };

  // expose getters

  setConfig(id: string) {
    this.config = this.configurations[id];
  }

  isZoomingOut(id: string) {
    return this.zoomOutState()[id] ?? false;
  }

  zoomOut(id: string) {
    this.zoomOutState.update((s) => ({ ...s, [id]: true }));
  }

  hide(id: string) {
    this.openState.update((s) => ({ ...s, [id]: false }));
    this.zoomOutState.update((s) => ({ ...s, [id]: false }));
  }
}
