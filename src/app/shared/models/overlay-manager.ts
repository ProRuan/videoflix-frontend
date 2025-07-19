import { WritableSignal } from '@angular/core';

export abstract class OverlayManager {
  protected abstract openState: WritableSignal<Record<string, boolean>>;

  isOpen(id: string) {
    return this.openState()[id] ?? false;
  }

  open(id: string) {
    this.openState.update((s) => ({ ...s, [id]: true }));
  }

  // rename hide to close ... ?
  abstract hide(id: string): void;
}
