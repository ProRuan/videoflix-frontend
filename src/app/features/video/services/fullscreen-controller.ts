import { computed, inject, Injectable, signal } from '@angular/core';

import { VideoPlayerFacade } from './video-player-facade';
import { TimeoutId } from '@shared/constants';

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

  private playerUITimeout: TimeoutId = -1;

  isFullscreen = signal(false);
  hasPlayerUI = signal(true);
  isVideoOnly = computed(() => this.isFullscreen() && !this.hasPlayerUI());

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
    this.playerUITimeout = setTimeout(() => {
      this.hasPlayerUI.set(false);
    }, 2000);
  }
}
