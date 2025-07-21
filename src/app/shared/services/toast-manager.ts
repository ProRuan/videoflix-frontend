import { Injectable } from '@angular/core';
import { OverlayManager } from '../models/overlay-manager';
import { ToastIds } from '../ts/enums';

@Injectable({
  providedIn: 'root',
})

/**
 * Class representing a toast manager service.
 */
export class ToastManager extends OverlayManager {
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
