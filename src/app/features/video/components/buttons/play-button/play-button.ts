import { Component, inject } from '@angular/core';

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

  /**
   * Toggle between play and pause on click.
   */
  onPlay() {
    this.facade.togglePlay();
  }

  /**
   * Check if the pause icon needs to be displayed.
   * @returns True if the video is playing, otherwise false.
   */
  isPause() {
    return this.facade.isPlaying();
  }

  /**
   * Check if the replay icon needs to be displayed.
   * @returns True if the video has ended, otherwise false.
   */
  isReplay() {
    return this.facade.hasEnded();
  }
}
