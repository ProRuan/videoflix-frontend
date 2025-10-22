import { Component, computed, inject } from '@angular/core';
import { CloseVideoButton } from '@features/video/components/buttons/close-video-button/close-video-button';

import {
  FullscreenController,
  QualityLevelController,
  VideoPlayerFacade,
} from '@features/video/services';
// import { BackButton } from '@shared/components/buttons';

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
  private fsContr = inject(FullscreenController);
  private qlContr = inject(QualityLevelController);

  title = computed(() => this.facade.title());
  isVideoOnly = computed(() => this.fsContr.isVideoOnly());
  percent = computed(() => this.qlContr.optimizingPercent());

  isMessageDisplayed = computed(() => this.facade.isMessageDisplayed());
}
