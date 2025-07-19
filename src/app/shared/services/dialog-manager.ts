import { Injectable, signal } from '@angular/core';
import { OverlayManager } from '../models/overlay-manager';
import { DialogIds } from '../ts/enums';

@Injectable({
  providedIn: 'root',
})
export class DialogManager extends OverlayManager {
  protected openState = signal<Record<string, boolean>>({
    [DialogIds.SignUpSuccess]: false,
    [DialogIds.ForgotPasswordSuccess]: false,
  });
  private zoomOutState = signal<Record<string, boolean>>({
    [DialogIds.SignUpSuccess]: false,
    [DialogIds.ForgotPasswordSuccess]: false,
  });

  // expose getters

  isZoomingOut(id: string) {
    return this.zoomOutState()[id] ?? false;
  }

  zoomOut(id: string) {
    this.zoomOutState.update((s) => ({ ...s, [id]: true }));
  }

  hide(id: string) {
    this.openState.update((s) => ({ ...s, [id]: false }));
    this.zoomOutState.update((s) => ({ ...s, [id]: false }));
  }
}
