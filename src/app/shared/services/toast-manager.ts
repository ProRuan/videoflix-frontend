import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { OverlayManager } from '../models/overlay-manager';
import { ToastIds } from '../ts/enums';

@Injectable({
  providedIn: 'root',
})
export class ToastManager {
  private activeToast: WritableSignal<ToastIds> = signal(ToastIds.None);
  // think about name ...
  private hasSlideOut = signal(false);

  // OverlayManager, separated services or one common service ... ?

  // must config a signal ... ?!
  // try to use computed and work with two ids (SuccessDialog, ForgotPasswortSuccess) ... !

  // // local messages necessary ... ?
  message: string = 'Please check your input and try again.';
  private timeoutId!: ReturnType<typeof setTimeout>;

  /**
   * Check a dialog for its open state.
   * @param id - The dialog id.
   * @returns A boolean value.
   */
  isOpen(id: ToastIds) {
    return this.activeToast() === id;
  }

  isSlidingOut(id: ToastIds) {
    return this.activeToast() === id && this.hasSlideOut();
  }

  open(id: ToastIds) {
    // this.config = this.configurations[id];
    // this.hasZoomedOut.set(false);
    this.activeToast.set(id);
  }

  openErrorToast() {
    this.activeToast.set(ToastIds.Error);
    this.clearTimeout();
    this.timeoutId = setTimeout(() => {
      this.hasSlideOut.set(true);
      console.log('timeout');
    }, 4000);
  }

  slideOutCurrent() {
    this.hasSlideOut.set(true);
  }

  // call it close ... ?
  hide() {
    this.activeToast.set(ToastIds.None);
    this.hasSlideOut.set(false);
  }

  slideOutImmediately() {
    this.clearTimeout();
    this.hasSlideOut.set(true);
    // this.slideOut(id);
  }

  clearTimeout() {
    clearTimeout(this.timeoutId);
  }
}
