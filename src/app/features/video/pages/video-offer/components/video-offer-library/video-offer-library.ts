import { ViewportScroller } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { Video } from '@features/video/models';
import { VideoOfferFacade } from '@features/video/services';
import { WindowResizer } from '@shared/services';

/**
 * Class representing a video offer library component.
 */
@Component({
  selector: 'app-video-offer-library',
  imports: [],
  templateUrl: './video-offer-library.html',
  styleUrl: './video-offer-library.scss',
})
export class VideoOfferLibrary {
  private scroller = inject(ViewportScroller);
  private facade = inject(VideoOfferFacade);
  private resizer = inject(WindowResizer);

  library = computed(() => this.facade.library());
  isMobile = computed(() => this.resizer.isMobile());

  /**
   * Update the video preview on click.
   * @param video - The video to be set.
   */
  onPreview(video: Video) {
    this.facade.updateVideoPreview(video);
    if (this.isMobile()) {
      this.facade.hasPreview.set(true);
    } else {
      this.scroller.scrollToPosition([0, 0], { behavior: 'smooth' });
    }
  }
}
