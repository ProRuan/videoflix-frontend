import { Component, inject } from '@angular/core';

import { VideoPlayerFacade } from '@features/video/services';

/**
 * Class representing a skip-backwards button component.
 */
@Component({
  selector: 'app-skip-backwards-button',
  imports: [],
  templateUrl: './skip-backwards-button.html',
  styleUrl: './skip-backwards-button.scss',
})
export class SkipBackwardsButton {
  private facade = inject(VideoPlayerFacade);

  /**
   * Skip backwards on click.
   */
  onBackwardSkip() {
    this.facade.skipPlayProgress(true);
  }
}
