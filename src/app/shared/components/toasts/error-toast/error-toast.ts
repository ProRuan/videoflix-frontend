import { Component, inject } from '@angular/core';

import { ToastIds } from '@shared/constants';
import { ToastManager } from '../../../services/toast-manager';

@Component({
  selector: 'app-error-toast',
  imports: [],
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.scss',
})

/**
 * Class representing an error toast component.
 */
export class ErrorToast {
  private toasts: ToastManager = inject(ToastManager);

  /**
   * Get the closing state of an error toast.
   * @returns A boolean value.
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
