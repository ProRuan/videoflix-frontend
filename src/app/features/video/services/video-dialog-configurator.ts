import { inject, Injectable } from '@angular/core';

import { VideoPlayerFacade } from './video-player-facade';

/**
 * Class representing a video dialog configurator.
 *
 * Provides configurations for video settings dialogs.
 */
@Injectable({
  providedIn: 'root',
})
export class VideoDialogConfigurator {
  private facade = inject(VideoPlayerFacade);

  readonly playbackRateDialogConfig = {
    id: 'playback-rate-dialog',
    title: 'Playback rate',
    values: [2, 1.5, 1.25, 1, 0.75, 0.5],
    isSelected: (value: number) => this.facade.isCurrentPlaybackRate(value),
    onClick: (value: number) => this.facade.setPlaybackRate(value),
  };

  readonly qualityLevelsDialogConfig = {
    id: 'quality-levels-dialog',
    title: 'Quality',
    values: ['auto', '1080p', '720p', '360p', '144p'],
    isSelected: (value: number) => this.facade.isCurrentQualityLevel(value),
    onClick: (value: number) => this.facade.setQualityLevel(value),
  };
}
