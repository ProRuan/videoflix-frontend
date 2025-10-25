import { Component, computed, inject } from '@angular/core';

import { CloseVideoButton } from '@features/video/components';
import {
  FullscreenController,
  QualityLevelController,
  VideoPlayerFacade,
} from '@features/video/services';

/**
 * Class representing a video player header component.
 */
@Component({
  selector: 'app-video-player-header',
  imports: [CloseVideoButton],
  templateUrl: './video-player-header.html',
  styleUrl: './video-player-header.scss',
  host: {
    '[class.move-up]': 'isLeaving()',
    '[class.move-down]': 'isEntering()',
    '(transitionend)': 'onLeaveEnd()',
  },
})
export class VideoPlayerHeader {
  private facade = inject(VideoPlayerFacade);
  private videoQualities = inject(QualityLevelController);
  private screenModes = inject(FullscreenController);

  title = computed(() => this.facade.title());

  hasMessage = computed(() => this.videoQualities.hasMessage());
  percent = computed(() => this.videoQualities.optimizingPercent());

  isLeaving = computed(() => this.screenModes.isLeaving());
  isEntering = computed(() => this.screenModes.isEntering());
  isMobileScreen = computed(() => this.screenModes.isMobileScreen());

  /**
   * Hide the player UI on transition end.
   */
  onLeaveEnd() {
    this.screenModes.hidePlayerUI();
  }
}
