import { Component, computed, inject, input } from '@angular/core';
import { VideoPlayerFacade } from '@features/video/services';

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
  private facade = inject(VideoPlayerFacade);

  percent = computed(() => this.facade.optimizingPercent());
}
