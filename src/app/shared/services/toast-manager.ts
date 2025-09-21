import { Injectable, signal, WritableSignal } from '@angular/core';

import { ToastIds } from '@shared/constants';

import { OverlayManagerBase } from './overlay-manager-base';
import { HttpErrorResponse } from '@angular/common/http';

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

  // improve an rename ... !
  errorMessage: WritableSignal<string> = signal('');

  // improve an rename ... !
  openError(error: HttpErrorResponse) {
    this.open(ToastIds.Error);
    console.log('error: ', error);
    console.log('error - status: ', error.status);
    // console.log('error - status text: ', error.statusText);
    console.log('error - custom: ', error.error.detail[0]);
    this.errorMessage.set(error.error.detail[0]);
  }

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
