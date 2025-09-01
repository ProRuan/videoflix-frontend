import { Component, inject } from '@angular/core';

import { ToastIds } from '@shared/constants';
import { ToastManager } from '@shared/services';

/**
 * Class representing an error toast component.
 */
@Component({
  selector: 'app-error-toast',
  imports: [],
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.scss',
})
export class ErrorToast {
  private toasts = inject(ToastManager);

  /**
   * Get the closing state of an error toast.
   * @returns True if the error toast is closing, otherwise false.
   */
  get closing() {
    return this.toasts.isClosing(ToastIds.Error);
  }

  /**
   * Get the message of an error toast.
   * @return The message of the error toast.
   */
  get message() {
    return this.toasts.message;
  }

  /**
   * Start closing an error toast on click.
   */
  onCloseStart() {
    this.toasts.slideOutImmediately();
  }

  /**
   * Remove an error toast from the HTML DOM on transition end.
   */
  onCloseEnd() {
    if (this.closing) {
      this.toasts.close();
    }
  }
}
