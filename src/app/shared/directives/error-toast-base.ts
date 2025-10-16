import { computed, Directive, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ToastIds } from '@shared/constants';
import { ToastManager } from '@shared/services';

/**
 * Class representing an error toast base directive.
 *
 * Contains properties and methods for error toast components.
 */
@Directive()
export class ErrorToastBase {
  private router = inject(Router);
  private toasts = inject(ToastManager);

  messages = computed(() => this.toasts.messages());
  label = computed(() => this.toasts.label());
  url = computed(() => this.toasts.url());

  /**
   * Get the closing state of an error toast.
   * @returns True if the error toast is closing, otherwise false.
   */
  get closing() {
    return this.toasts.isClosing(ToastIds.Error);
  }

  /**
   * Start closing an error toast on click.
   */
  onCloseStart() {
    this.toasts.startClosing();
  }

  /**
   * Remove an error toast from the HTML DOM on transition end.
   */
  onCloseEnd() {
    if (this.closing) {
      this.toasts.close();
    }
  }

  /**
   * Stop an event.
   * @param event - The event to be stopped.
   */
  onEventStop(event: Event) {
    event.stopPropagation();
  }

  /**
   * Redirect user to target route on click.
   */
  onRedirect() {
    this.toasts.close();
    this.router.navigateByUrl(this.url());
  }
}
