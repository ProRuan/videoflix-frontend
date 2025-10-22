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
    '[class.move-up]': 'isVideoOnly()',
  },
})
export class VideoPlayerHeader {
  private facade = inject(VideoPlayerFacade);
  private screenModes = inject(FullscreenController);
  private videoQualities = inject(QualityLevelController);

  title = computed(() => this.facade.title());
  isMessageDisplayed = computed(() => this.facade.isMessageDisplayed());
  isVideoOnly = computed(() => this.screenModes.isVideoOnly());
  percent = computed(() => this.videoQualities.optimizingPercent());
}
