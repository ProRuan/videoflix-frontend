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
  isDesktop = computed(() => this.width() > 768);
  isMobile = computed(() => !this.isDesktop());

  orientationType = signal<typeof screen.orientation.type>('landscape-primary');
  orientation = computed(() => this.orientationType().split('-')[0]);
  isPortrait = computed(() => this.orientation() === 'portrait');
  isLandscape = computed(() => this.orientation() === 'landscape');
  isFullscreen = computed(() => this.width() < 1280 + 1);

  /**
   * Creates a window resizer service.
   */
  constructor() {
    this.listenToWindowWidth();
    this.listenToOrientation();
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

  private listenToOrientation() {
    const initial$ = this.getInitialOrientation();
    const resize$ = this.getChangedOrientation();
    scheduled([initial$, resize$], asapScheduler)
      .pipe(concatAll())
      .subscribe((value) => {
        this.orientationType.set(value);
        // console.log('orientation: ', value);
        // console.log('is portrait: ', this.isPortrait());
        // console.log('is landscape: ', this.isLandscape());
      });
  }

  private getInitialOrientation() {
    return of(screen.orientation.type);
  }

  private getChangedOrientation() {
    return fromEvent(screen.orientation, 'change').pipe(
      map(() => screen.orientation.type)
    );
  }
}
