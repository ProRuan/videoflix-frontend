import { Component, inject } from '@angular/core';

import { FullscreenController } from '@features/video/services';

/**
 * Class representing a fullscreen button component.
 */
@Component({
  selector: 'app-fullscreen-button',
  imports: [],
  templateUrl: './fullscreen-button.html',
  styleUrl: './fullscreen-button.scss',
})
export class FullscreenButton {
  private fsContr = inject(FullscreenController);

  /**
   * Toggle fullscreen mode on click.
   */
  onFullscreen() {
    this.fsContr.toggleFullscreen();
  }

  /**
   * Check if the fullscreen mode is enabled.
   * @returns True if the fullscreen mode is enabled, otherwise false.
   */
  isFullscreen() {
    return this.fsContr.isFullscreen();
  }
}
