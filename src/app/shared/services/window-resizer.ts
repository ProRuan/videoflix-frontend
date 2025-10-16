import { computed, Injectable, signal } from '@angular/core';

import { asapScheduler, concatAll, fromEvent, map, of, scheduled } from 'rxjs';

/**
 * Class representing a window resizer service.
 */
@Injectable({
  providedIn: 'root',
})
export class WindowResizer {
  width = signal(0);
  isSmallTablet = computed(() => this.width() < 768 + 1);

  /**
   * Creates a window resizer service.
   */
  constructor() {
    this.listenToWindowWidth();
  }

  /**
   * Listen to window resize events to update the current width.
   */
  private listenToWindowWidth() {
    const initial$ = this.getInitialWidth();
    const resize$ = this.getChangedWidth();
    scheduled([initial$, resize$], asapScheduler)
      .pipe(concatAll())
      .subscribe((value) => this.width.set(value));
  }

  /**
   * Get an initial width.
   * @returns The initial width.
   */
  private getInitialWidth() {
    return of(window.innerWidth);
  }

  /**
   * Get a changed width.
   * @returns The changed width.
   */
  private getChangedWidth() {
    return fromEvent(window, 'resize').pipe(map(() => window.innerWidth));
  }
}
