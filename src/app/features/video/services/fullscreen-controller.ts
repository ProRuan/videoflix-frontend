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

  isMobile = computed(() => this.resizer.isMobile());

  isFullscreen = signal(false);
  hasPlayerUI = signal(true);
  isIdle = signal(false);
  isVideoOnly = computed(
    () =>
      (this.isFullscreen() && !this.hasPlayerUI()) ||
      (this.isMobile() && !this.hasPlayerUI())
  );

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
    this.isIdle.set(false);
    this.playerUITimeout = setTimeout(() => {
      this.hasPlayerUI.set(false);
      this.isIdle.set(true);
    }, 2000);
  }

  hidePlayerUI() {
    clearTimeout(this.playerUITimeout);
    this.hasPlayerUI.set(false);
    this.isIdle.set(true);
  }
}
