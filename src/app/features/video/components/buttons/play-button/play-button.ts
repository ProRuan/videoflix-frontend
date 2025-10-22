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
  private fsContr = inject(FullscreenController);

  isPlaying = computed(() => this.facade.isPlaying());
  isPause = computed(() => this.facade.isPlaying());
  isReplay = computed(() => this.facade.hasEnded());

  // edit ... ?
  icons = computed(() => {
    return {
      pause: this.isPause(),
      replay: this.isReplay(),
    };
  });

  /**
   * Toggle between play and pause on click.
   */
  onPlay() {
    this.facade.togglePlay();
    if (this.isPlaying()) {
      this.fsContr.hidePlayerUI();
    }
  }
}
