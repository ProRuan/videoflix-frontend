import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PrimaryButton } from '../../../shared/components/primary-button/primary-button';
import { DialogManager } from '../../../shared/services/dialog-manager';
import { DialogIds } from '../../../shared/ts/enums';

@Component({
  selector: 'app-sign-up-success-dialog',
  imports: [PrimaryButton],
  templateUrl: './sign-up-success-dialog.html',
  styleUrl: './sign-up-success-dialog.scss',
})

/**
 * Class representing a sign-up success dialog.
 */
export class SignUpSuccessDialog {
  private dialogs: DialogManager = inject(DialogManager);

  @Input() zoomingOut = false;
  @Output() close = new EventEmitter<void>();

  /**
   * Close a dialog with a zoom-out animation.
   */
  onClose() {
    this.zoomingOut = true;
  }

  /**
   * Hide a dialog by removing it from the HTML DOM.
   */
  onHide() {
    if (this.zoomingOut) {
      this.zoomingOut = false;
      this.dialogs.hide(DialogIds.SignUpSuccess);
    }
  }

  /**
   * Stop an event.
   * @param event - The event to be stopped.
   */
  onEventStop(event: Event) {
    event.stopPropagation();
  }
}
