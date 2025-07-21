import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PrimaryButton } from '../../../shared/components/primary-button/primary-button';
import { DialogManager } from '../../../shared/services/dialog-manager';
import { DialogIds } from '../../ts/enums';

@Component({
  selector: 'app-success-dialog',
  imports: [PrimaryButton],
  templateUrl: './success-dialog.html',
  styleUrl: './success-dialog.scss',
})

/**
 * Class representing a success dialog component.
 */
export class SuccessDialog {
  private router: Router = inject(Router);
  private dialogs: DialogManager = inject(DialogManager);

  /**
   * Get the closing state of a success dialog.
   * @return A boolean value.
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
    this.router.navigateByUrl('log-in');
  }
}
