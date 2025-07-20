import { Injectable, signal, WritableSignal } from '@angular/core';
import { OverlayManager } from '../models/overlay-manager';
import { ToastIds } from '../ts/enums';

@Injectable({
  providedIn: 'root',
})
export class ToastManager extends OverlayManager {
  protected override openState: WritableSignal<Record<string, boolean>> =
    signal({
      [ToastIds.ErrorToast]: false,
    });
  private slideOutState = signal<Record<string, boolean>>({
    [ToastIds.ErrorToast]: false,
  });
  private timeoutId!: ReturnType<typeof setTimeout>;

  // local messages necessary ... ?
  message: string = 'Please check your input and try again.';

  override open(id: string) {
    this.openState.update((s) => ({ ...s, [id]: true }));
    this.clearTimeout();
    this.timeoutId = setTimeout(() => {
      this.slideOut(ToastIds.ErrorToast);
      console.log('open and timeout');
    }, 4000);
  }

  slideOutImmediately(id: string) {
    this.clearTimeout();
    this.slideOut(id);
  }

  clearTimeout() {
    clearTimeout(this.timeoutId);
  }

  isSlidingOut(id: string) {
    return this.slideOutState()[id] ?? false;
  }

  slideOut(id: string) {
    this.slideOutState.update((s) => ({ ...s, [id]: true }));
  }

  // ask for explanation of update here ... !
  hide(id: string): void {
    this.openState.update((s) => ({ ...s, [id]: false }));
    this.slideOutState.update((s) => ({ ...s, [id]: false }));
  }
}
