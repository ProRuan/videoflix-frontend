import { Component, computed, inject } from '@angular/core';

import { VideoPlayerFacade } from '@features/video/services';

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

  isPause = computed(() => this.facade.isPlaying());
  isReplay = computed(() => this.facade.hasEnded());

  /**
   * Toggle between play and pause on click.
   */
  onPlay() {
    this.facade.togglePlay();
  }
}
