import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { OverlayManager } from '../models/overlay-manager';
import { SuccessDialogConfig } from '../interfaces/success-dialog-config';
import { DialogIds } from '../ts/enums';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a dialog manager service.
 */
export class DialogManager extends OverlayManager {
  private configId: WritableSignal<string> = signal('');
  private currentConfig: Signal<SuccessDialogConfig> = computed(
    () => this.configData[this.configId()]
  );

  private readonly configData: Record<string, SuccessDialogConfig> = {
    [DialogIds.SignUpSuccess]: {
      title: 'Registration Successful',
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
