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
    '(transitionend)': 'onLeave()',
  },
})
export class VideoPlayerHeader {
  private facade = inject(VideoPlayerFacade);
  private screenModes = inject(FullscreenController);
  private videoQualities = inject(QualityLevelController);

  // css class move-down with starting style ...

  title = computed(() => this.facade.title());
  isMessageDisplayed = computed(() => this.facade.isMessageDisplayed());
  percent = computed(() => this.videoQualities.optimizingPercent());

  // new
  isLeaving = computed(() => this.screenModes.isLeaving());
  isEntering = computed(() => this.screenModes.isEntering());

  onLeave() {
    this.screenModes.hidePlayerUI();
  }
}
