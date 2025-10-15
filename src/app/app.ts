import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SuccessDialog } from '@shared/components/dialogs';
import { ErrorToast } from '@shared/components/toasts';
import { DialogIds, ToastIds } from '@shared/constants';
import { DialogManager, ToastManager } from '@shared/services';

/**
 * Class representing a Videoflix App.
 */
@Component({
  selector: 'app-root',
  imports: [ErrorToast, RouterOutlet, SuccessDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private dialogs = inject(DialogManager);
  private toasts = inject(ToastManager);

  protected title = 'videoflix-frontend';

  /**
   * Check if a success dialog is open.
   * @returns True if a success dialog is open, otherwise false.
   */
  isDialogOpen() {
    return this.dialogs.isOpen(DialogIds.Success);
  }

  /**
   * Check if an error toast is open.
   * @returns True if an error toast is open, otherwise false.
   */
  isToastOpen() {
    return this.toasts.isOpen(ToastIds.Error);
  }
}
