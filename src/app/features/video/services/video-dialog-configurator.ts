import { inject, Injectable } from '@angular/core';

import { VideoDialogIds } from '../constants';
import { VideoSettingsDialogConfig } from '../interfaces';

import { PlaybackRateController } from './playback-rate-controller';
import { QualityLevelController } from './quality-level-controller';

/**
 * Class representing a video dialog configurator.
 *
 * Provides configurations for video settings dialogs.
 */
@Injectable({
  providedIn: 'root',
})
export class VideoDialogConfigurator {
  private playbackRates = inject(PlaybackRateController);
  private videoQualities = inject(QualityLevelController);

  readonly playbackRateDialogConfig: VideoSettingsDialogConfig = {
    id: 'playback-rate-dialog',
    title: 'Playback rate',
    values: [2, 1.5, 1.25, 1, 0.75, 0.5],
    isSelected: (value: number) => this.playbackRates.isPlaybackRate(value),
    onClick: (value: number) => this.playbackRates.updatePlaybackRate(value),
  };

  readonly qualityLevelsDialogConfig: VideoSettingsDialogConfig = {
    id: 'quality-levels-dialog',
    title: 'Quality',
    values: ['auto', '1080p', '720p', '360p', '144p'],
    isSelected: (value: number) => this.videoQualities.isQualityLevel(value),
    onClick: (value: number) => this.videoQualities.updateQualityLevel(value),
  };

  /**
   * Get a video settings dialog configuration.
   * @param id - The video settings dialog id.
   * @returns The video settings dialog configuration.
   */
  getConfig(id: VideoDialogIds): VideoSettingsDialogConfig {
    return this.getChoices()[id];
  }

  /**
   * Get pickable video settings dialog configurations.
   * @returns The pickable video settings dialog configurations.
   */
  private getChoices(): Record<VideoDialogIds, VideoSettingsDialogConfig> {
    return {
      [VideoDialogIds.PlaybackRate]: this.playbackRateDialogConfig,
      [VideoDialogIds.QualityLevels]: this.qualityLevelsDialogConfig,
    };
  }
}
