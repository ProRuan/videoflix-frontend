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
import {
  FullscreenController,
  QualityLevelController,
  VideoPlayerFacade,
} from '@features/video/services';

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
  host: {
    '[class.move-down]': 'isLeaving()',
    '[class.move-up]': 'isEntering()',
    '(transitionend)': 'onLeaveEnd()',
  },
})
export class VideoPlayerMultiBar {
  private facade = inject(VideoPlayerFacade);
  private screenModes = inject(FullscreenController);
  private videoQualites = inject(QualityLevelController);

  title = computed(() => this.facade.title());

  isLeaving = computed(() => this.screenModes.isLeaving());
  isEntering = computed(() => this.screenModes.isEntering());
  isMobileScreen = computed(() => this.screenModes.isMobileScreen());

  hasQualityLevels = computed(() => this.videoQualites.hasQualityLevels());

  /**
   * Hide the player UI on transition end.
   */
  onLeaveEnd() {
    this.screenModes.hidePlayerUI();
  }
}
