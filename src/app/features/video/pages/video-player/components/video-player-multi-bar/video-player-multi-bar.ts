import { Component, computed, inject } from '@angular/core';

import {
  FullscreenButton,
  PlaybackRateButton,
  PlayButton,
  PlayProgressBar,
  QualityButton,
  SkipBackwardsButton,
  SkipForwardButton,
  VolumeControl,
} from '@features/video/components';
import { VideoPlayerFacade } from '@features/video/services';

/**
 * Class representing a video player multi bar component.
 *
 * Contains play progress bar and control bar.
 */
@Component({
  selector: 'app-video-player-multi-bar',
  imports: [
    FullscreenButton,
    PlaybackRateButton,
    PlayButton,
    PlayProgressBar,
    QualityButton,
    SkipBackwardsButton,
    SkipForwardButton,
    VolumeControl,
  ],
  templateUrl: './video-player-multi-bar.html',
  styleUrl: './video-player-multi-bar.scss',
})
export class VideoPlayerMultiBar {
  private facade = inject(VideoPlayerFacade);

  title = computed(() => this.facade.title());
}
