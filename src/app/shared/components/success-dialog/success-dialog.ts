import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrimaryButton } from '../../../shared/components/primary-button/primary-button';
import { DialogManager } from '../../../shared/services/dialog-manager';
import { SuccessDialogConfig } from '../../interfaces/success-dialog-config';
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

  @Input() config!: SuccessDialogConfig;
  @Input() zoomingOut = false;

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
      this.dialogs.hide(DialogIds.SuccessDialog);
    }
  }

  /**
   * Stop an event.
   * @param event - The event to be stopped.
   */
  onEventStop(event: Event) {
    event.stopPropagation();
  }

  onRedirect() {
    this.router.navigateByUrl('log-in');
    this.dialogs.hide(DialogIds.SuccessDialog);

    // called twice?!
    console.log('log in');
  }
}
