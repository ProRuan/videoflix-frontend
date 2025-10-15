import { Injectable, signal, WritableSignal } from '@angular/core';

/**
 * Class representing an overlay manager base service.
 *
 * It provides logic for overlay elements such as dialogs or toasts.
 */
@Injectable({
  providedIn: 'root',
})
export class OverlayManagerBase {
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
   * @returns True if the overlay element is open, otherwise false.
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
   * @returns True if the overlay element is closing, otherwise false.
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
