import { Component, computed, inject } from '@angular/core';

import { VideoQualityController } from '@features/video/services';
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
  private qualities = inject(VideoQualityController);

  percent = computed(() => this.qualities.optimizingPercent());
}
