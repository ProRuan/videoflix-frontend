import { inject, Injectable, signal } from '@angular/core';

import { VideoPlayerFacade } from './video-player-facade';

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

  isFullscreen = signal(false);

  /**
   * Toggle a video´s fullscreen mode.
   */
  toggleFullscreen() {
    this.facade.clearPlayTimeout();
    const element = this.facade.playerContainer()?.nativeElement;
    this.isFullscreen() ? this.exitFullscreen() : this.enterFullscreen(element);
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
   * @param element - The element to be displayed in fullscreen mode.
   */
  enterFullscreen(element?: HTMLDivElement) {
    if (document.fullscreenEnabled) {
      element?.requestFullscreen();
    }
  }
}
