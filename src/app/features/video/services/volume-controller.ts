import { computed, inject, Injectable, signal } from '@angular/core';

import { VideoPlayerFacade } from './video-player-facade';

/**
 * Class representing a volume controller service.
 *
 * Controls a video´s volume settings.
 */
@Injectable({
  providedIn: 'root',
})
export class VolumeController {
  private facade = inject(VideoPlayerFacade);

  player = computed(() => this.facade.player());

  volume = signal(0.5);
  cachedVolume = signal(0.5);
  volumePercent = computed(() => this.volume() * 100);
  isMute = computed(() => this.volume() === 0);

  /**
   * Toggle between mute and volume.
   */
  toggleMute() {
    if (this.isMuted()) {
      this.updateVolume(false, this.cachedVolume());
    } else {
      this.updateVolume(true, 0, this.getVolume());
    }
  }

  /**
   * Check if the video is muted.
   * @returns True if the video is muted, otherwise false.
   */
  private isMuted() {
    return this.facade.hasProperty('muted');
  }

  /**
   * Update the volume parameters.
   * @param muted - A boolean value.
   * @param volume - The volume to be set.
   * @param currentVolume - The current volume.
   */
  private updateVolume(muted: boolean, volume: number, currentVolume?: number) {
    this.setMute(muted);
    this.cachedVolume.update((value) => currentVolume ?? value);
    this.setVolume(volume);
  }

  /**
   * Set the mute state of the video.
   * @param value - The value to be set.
   */
  private setMute(value: boolean) {
    this.player()?.muted(value);
  }

  /**
   * Set the volume of the video.
   * @param value - The value to be set.
   */
  setVolume(value: number) {
    this.volume.set(value);
    this.player()?.volume(value);
    if (this.volume() > 0) {
      this.setMute(false);
    }
  }

  /**
   * Get the volume of the video.
   * @returns - The volume of the video.
   */
  private getVolume() {
    return this.facade.getProperty('volume');
  }
}
