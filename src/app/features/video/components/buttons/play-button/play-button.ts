import { Component, computed, inject } from '@angular/core';

import {
  FullscreenController,
  VideoPlayerFacade,
} from '@features/video/services';

/**
 * Class representing a play button component.
 */
@Component({
  selector: 'app-play-button',
  imports: [],
  templateUrl: './play-button.html',
  styleUrl: './play-button.scss',
})
export class PlayButton {
  private facade = inject(VideoPlayerFacade);
  private screenModes = inject(FullscreenController);

  isPlaying = computed(() => this.facade.isPlaying());
  hasPause = computed(() => this.facade.isPlaying());
  hasReplay = computed(() => this.facade.hasEnded());

  /**
   * Get an icon css class.
   * @returns The icon css class.
   */
  getClass() {
    return {
      pause: this.hasPause(),
      replay: this.hasReplay(),
    };
  }

  /**
   * Toggle between play and pause on click.
   */
  onPlay() {
    this.facade.togglePlay();
    if (this.isPlaying()) {
      this.screenModes.hidePlayerUI();
    }
  }
}
