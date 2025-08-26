import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';

import { SuccessDialogConfig } from '@core/auth/interfaces';

import { DialogIds } from '@shared/constants';

import { OverlayManagerBase } from './overlay-manager-base';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a dialog manager service.
 * @extends OverlayManagerBase
 */
export class DialogManager extends OverlayManagerBase {
  private configId: WritableSignal<string> = signal('');
  private currentConfig: Signal<SuccessDialogConfig> = computed(
    () => this.configData[this.configId()]
  );

  private readonly configData: Record<string, SuccessDialogConfig> = {
    [DialogIds.SignUpSuccess]: {
      title: 'Registration successful',
      messages: [
        'Thank you for registering!',
        `We’ve sent a confirmation email to your inbox.
              Please click the activation link inside to unlock your account.`,
      ],
    },
    [DialogIds.ReactivateAccountSuccess]: {
      title: 'Email sent',
      messages: [
        'We’ve sent you an account activation link.',
        'Check your inbox and click the link to reactivate your account.',
      ],
    },
    [DialogIds.ForgotPasswordSuccess]: {
      title: 'Email sent',
      messages: [
        'We’ve sent you a password reset link.',
        'Check your inbox and click the link to choose a new password.',
      ],
    },
    [DialogIds.SignOutSuccess]: {
      title: 'Email sent',
      messages: [
        'We’ve sent you an account deletion link.',
        'Check your inbox and click the link to delete your account.',
      ],
    },
  };

  /**
   * Get the current dialog configuration.
   * @returns The current dialog configuration.
   */
  get config() {
    return this.currentConfig();
  }

  /**
   * Open a success dialog.
   * @param id - The success dialog id.
   */
  openSuccessDialog(id: DialogIds) {
    this.configId.set(id);
    this.open(DialogIds.Success);
  }
}
