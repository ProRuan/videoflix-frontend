import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ErrorToast } from '@shared/components/toasts';
import { ToastIds } from '@shared/constants';
import { ToastManager } from '@shared/services';

/**
 * Class representing a Videoflix App.
 */
@Component({
  selector: 'app-root',
  imports: [ErrorToast, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private toasts = inject(ToastManager);

  protected title = 'videoflix-frontend';

  /**
   * Check if an error toast is open.
   * @returns True if an error toast is open, otherwise false.
   */
  isToastOpen() {
    return this.toasts.isOpen(ToastIds.Error);
  }
}
