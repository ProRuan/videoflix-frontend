import { Injectable } from '@angular/core';

import { ToastIds } from '@shared/constants';

import { OverlayManagerBase } from './overlay-manager-base';

/**
 * Class representing a toast manager service.
 * @extends OverlayManagerBase
 */
@Injectable({
  providedIn: 'root',
})
export class ToastManager extends OverlayManagerBase {
  message: string = 'Please check your input and try again.';
  private timeoutId!: ReturnType<typeof setTimeout>;

  /**
   * Open an error toast.
   */
  openErrorToast() {
    this.clearTimeout();
    this.open(ToastIds.Error);
    this.timeoutId = setTimeout(() => {
      this.hasCloseStyle.set(true);
    }, 4000);
  }

  /**
   * Slide out a toast element without timeout.
   */
  slideOutImmediately() {
    this.clearTimeout();
    this.startClosing();
  }

  /**
   * Clear the current timeout.
   */
  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
