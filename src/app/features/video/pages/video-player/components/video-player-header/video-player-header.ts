import { Component, computed, inject } from '@angular/core';

import {
  FullscreenController,
  QualityLevelController,
} from '@features/video/services';
import { BackButton } from '@shared/components/buttons';

/**
 * Class representing a video player header component.
 */
@Component({
  selector: 'app-video-player-header',
  imports: [BackButton],
  templateUrl: './video-player-header.html',
  styleUrl: './video-player-header.scss',
  host: {
    '[class.move-up]': 'isVideoOnly()',
  },
})
export class VideoPlayerHeader {
  private fsContr = inject(FullscreenController);
  private qlContr = inject(QualityLevelController);

  isVideoOnly = computed(() => this.fsContr.isVideoOnly());
  percent = computed(() => this.qlContr.optimizingPercent());
}
