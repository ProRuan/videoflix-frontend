import { computed, inject, Injectable, signal } from '@angular/core';

import { VideoPlayerFacade } from './video-player-facade';
import { TimeoutId } from '@shared/constants';
import { WindowResizer } from '@shared/services';

/**
 * Class representing a fullscreen controller service.
 *
 * Controls a video´s fullscreen mode.
 */
@Injectable({
  providedIn: 'root',
})
export class FullscreenController {
  private facade = inject(VideoPlayerFacade);
  private resizer = inject(WindowResizer);

  // isIdle && !hasPlayerUI ...
  // fix 1280px and mouse move ...

  private playerUITimeout: TimeoutId = -1;

  // new
  isFullscreen = signal(false);
  isMobileScreen = computed(() => this.resizer.width() < 1280 + 1);
  isImmersive = computed(() => this.isMobileScreen() || this.isFullscreen());
  isStandard = computed(() => !this.isImmersive());

  hasPlayerUI = signal(true);
  isActive = computed(() => this.isStandard() || this.hasPlayerUI());
  isIdle = computed(() => !this.isActive());

  isLeaving = signal<boolean | null>(null);
  isEntering = computed(() => this.isLeaving() === false);
  isLocked = signal(false);

  /**
   * Toggle a video´s fullscreen mode.
   */
  toggleFullscreen() {
    this.facade.clearPlayTimeout();
    this.isFullscreen() ? this.exitFullscreen() : this.enterFullscreen();
  }

  /**
   * Exit the video´s fullscreen mode.
   */
  exitFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  /**
   * Enter a video´s fullscreen mode.
   */
  enterFullscreen() {
    const element = this.facade.playerBox();
    if (element && document.fullscreenEnabled) {
      element?.requestFullscreen();
    }
  }

  /**
   * Update the player UI display state.
   */
  updatePlayerUI() {
    this.isFullscreen.update((value) => !value);
    clearTimeout(this.playerUITimeout);
    if (this.isFullscreen()) {
      this.showPlayerUIWithTimeout();
    }
  }

  /**
   * Show the player UI with timeout.
   */
  showPlayerUIWithTimeout() {
    clearTimeout(this.playerUITimeout);
    this.hasPlayerUI.set(true);
    // this.isIdle.set(false);
    if (this.isLocked()) return;
    this.playerUITimeout = setTimeout(() => {
      this.isLeaving.set(true);
      // this.hasPlayerUI.set(false);
      // this.isIdle.set(true);
    }, 2000);
  }

  hidePlayerUI() {
    if (this.isLeaving()) {
      this.isLeaving.set(false);
      this.hasPlayerUI.set(false);
    }
    // clearTimeout(this.playerUITimeout);
    // this.hasPlayerUI.set(false);
    // this.isIdle.set(true);
  }

  // check ...
  setLocked(value: boolean) {
    this.isLocked.set(value);
    if (value === true) {
      clearTimeout(this.playerUITimeout);
    }
  }
}
