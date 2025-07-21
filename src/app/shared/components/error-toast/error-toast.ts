import { Component, inject, Input } from '@angular/core';
import { ToastManager } from '../../services/toast-manager';
import { ToastIds } from '../../ts/enums';

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

  @Input() message: string = '';

  /**
   * Get the sliding-out state of an error toast.
   * @returns A boolean value.
   */
  get slidingOut() {
    return this.toasts.isSlidingOut(ToastIds.Error);
  }

  /**
   * Slide out an error toast on close.
   */
  onClose() {
    this.toasts.slideOutImmediately();
  }

  /**
   * Hide an error toast by removing it from the HTML DOM.
   */
  onHide() {
    if (this.slidingOut) {
      this.toasts.hide();
      // this.toasts.hide(ToastIds.ErrorToast);
    }
  }
}
