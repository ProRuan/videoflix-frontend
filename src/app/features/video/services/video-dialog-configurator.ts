import { inject, Injectable } from '@angular/core';

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
  private pbrContr = inject(PlaybackRateController);
  private qlContr = inject(QualityLevelController);

  readonly playbackRateDialogConfig = {
    id: 'playback-rate-dialog',
    title: 'Playback rate',
    values: [2, 1.5, 1.25, 1, 0.75, 0.5],
    isSelected: (value: number) => this.pbrContr.isCurrentPlaybackRate(value),
    onClick: (value: number) => this.pbrContr.updatePlaybackRate(value),
  };

  readonly qualityLevelsDialogConfig = {
    id: 'quality-levels-dialog',
    title: 'Quality',
    values: ['auto', '1080p', '720p', '360p', '144p'],
    isSelected: (value: number) => this.qlContr.isCurrentQualityLevel(value),
    onClick: (value: number) => this.qlContr.updateQualityLevel(value),
  };
}
