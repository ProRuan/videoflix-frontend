import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { SuccessDialogConfig } from '../interfaces/success-dialog-config';
import { DialogIds } from '../ts/enums';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a dialog manager service.
 */
export class DialogManager {
  private activeDialog: WritableSignal<DialogIds> = signal(DialogIds.None);
  // think about name ...
  private hasZoomedOut = signal(false);
  private configId = signal(DialogIds.None);

  configSignal = computed(() => this.configurations[this.configId()]);

  // must config a signal ... ?!
  // try to use computed and work with two ids (SuccessDialog, ForgotPasswortSuccess) ... !

  get config() {
    return this.configSignal();
  }

  /**
   * Check a dialog for its open state.
   * @param id - The dialog id.
   * @returns A boolean value.
   */
  isOpen(id: DialogIds) {
    return this.activeDialog() === id;
  }

  isZoomingOut(id: DialogIds) {
    return this.activeDialog() === id && this.hasZoomedOut();
  }

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

  open(id: DialogIds) {
    // this.config = this.configurations[id];
    // this.hasZoomedOut.set(false);
    this.activeDialog.set(id);
  }

  openSuccessDialog(id: DialogIds) {
    this.configId.set(id);
    // this.configSignal();
    this.activeDialog.set(DialogIds.Success);
  }

  zoomOutCurrent() {
    this.hasZoomedOut.set(true);
  }

  // call it close ... ?
  hide() {
    this.activeDialog.set(DialogIds.None);
    this.hasZoomedOut.set(false);
  }
}
