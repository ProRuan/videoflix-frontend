import { signal, WritableSignal } from '@angular/core';

/**
 * Class representing an overlay manager.
 *
 * It provides base logic for overlay elements such as dialogs or toasts.
 */
export class OverlayManager {
  protected activeElement: WritableSignal<string> = signal('');
  protected hasCloseStyle: WritableSignal<boolean> = signal(false);

  /**
   * Open an overlay element.
   * @param id - The overlay element id.
   */
  open(id: string) {
    this.hasCloseStyle.set(false);
    this.activeElement.set(id);
  }

  /**
   * Check an overlay element for its open state.
   * @param id - The overlay element id.
   * @returns A boolean value.
   */
  isOpen(id: string) {
    return this.activeElement() === id;
  }

  /**
   * Start closing an overlay element by enabling the close style.
   */
  startClosing() {
    this.hasCloseStyle.set(true);
  }

  /**
   * Check if an overlay element is closing.
   * @param id - The overlay element id.
   * @returns A boolean value.
   */
  isClosing(id: string) {
    return this.activeElement() === id && this.hasCloseStyle();
  }

  /**
   * Close an overlay element.
   */
  close() {
    this.activeElement.set('');
  }
}
