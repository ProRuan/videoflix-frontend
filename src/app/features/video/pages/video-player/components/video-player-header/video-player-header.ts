import { Component, computed, inject } from '@angular/core';

import { QualityLevelController } from '@features/video/services';
import { BackButton } from '@shared/components/buttons';

/**
 * Class representing a video player header component.
 */
@Component({
  selector: 'app-video-player-header',
  imports: [BackButton],
  templateUrl: './video-player-header.html',
  styleUrl: './video-player-header.scss',
})
export class VideoPlayerHeader {
  private qlContr = inject(QualityLevelController);

  percent = computed(() => this.qlContr.optimizingPercent());
}
