import { computed, inject, Injectable, signal } from '@angular/core';

import { VideoPlayerFacade } from './video-player-facade';

/**
 * Class representing a playback rate controller service.
 *
 * Controls a video´s playback rate.
 */
@Injectable({
  providedIn: 'root',
})
export class PlaybackRateController {
  private facade = inject(VideoPlayerFacade);

  private readonly availablePlaybackRates = [2, 1.5, 1.25, 1, 0.75, 0.5];

  player = computed(() => this.facade.player());

  currentPlaybackRate = signal(0);

  /**
   * Update the video´s playback rate.
   * @param id - The playback rate id.
   */
  updatePlaybackRate(id: number) {
    const value = this.availablePlaybackRates[id];
    this.currentPlaybackRate.set(value);
    this.player()?.playbackRate(value);
  }

  /**
   * Check if a playback rate matches the current playback rate.
   * @param index - The playback rate id.
   * @returns True if the playback rate matches the current playback rate,
   *          otherwise false.
   */
  isCurrentPlaybackRate(index: number) {
    return this.currentPlaybackRate() === this.availablePlaybackRates[index];
  }
}
