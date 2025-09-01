import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PrimaryButton, SecondaryButton } from '@shared/components/buttons';
import { DialogIds } from '@shared/constants';
import { DialogManager } from '@shared/services';

/**
 * Class representing a success dialog component.
 */
@Component({
  selector: 'app-success-dialog',
  imports: [PrimaryButton, SecondaryButton],
  templateUrl: './success-dialog.html',
  styleUrl: './success-dialog.scss',
})
export class SuccessDialog {
  private router = inject(Router);
  private dialogs = inject(DialogManager);

  /**
   * Get the closing state of a success dialog.
   * @returns True if the dialog is closing, otherwise false.
   */
  get closing() {
    return this.dialogs.isClosing(DialogIds.Success);
  }

  /**
   * Get the configuration of a success dialog.
   * @returns The configuration of the success dialog.
   */
  get config() {
    return this.dialogs.config;
  }

  /**
   * Start closing a success dialog on click.
   */
  onCloseStart() {
    this.dialogs.startClosing();
  }

  /**
   * Remove a success dialog from the HTML DOM on transtion end.
   */
  onCloseEnd() {
    if (this.closing) {
      this.dialogs.close();
    }
  }

  /**
   * Stop an event.
   * @param event - The event to be stopped.
   */
  onEventStop(event: Event) {
    event.stopPropagation();
  }

  /**
   * Redirect a user to the log-in component.
   */
  onRedirect() {
    this.dialogs.close();
    this.router.navigateByUrl('/log-in');
  }
}
