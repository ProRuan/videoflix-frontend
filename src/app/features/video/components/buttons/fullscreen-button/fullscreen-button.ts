import { Component, computed, inject } from '@angular/core';

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

  isExit = computed(() => this.fsContr.isFullscreen());

  /**
   * Toggle fullscreen mode on click.
   */
  onFullscreen() {
    this.fsContr.toggleFullscreen();
  }
}
