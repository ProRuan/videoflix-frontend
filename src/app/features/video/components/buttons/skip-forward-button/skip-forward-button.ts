import { Component, inject } from '@angular/core';

import { VideoPlayerFacade } from '@features/video/services';

/**
 * Class representing a skip-forward button component.
 */
@Component({
  selector: 'app-skip-forward-button',
  imports: [],
  templateUrl: './skip-forward-button.html',
  styleUrl: './skip-forward-button.scss',
})
export class SkipForwardButton {
  private facade = inject(VideoPlayerFacade);

  /**
   * Skip forward on click.
   */
  onForwardSkip() {
    this.facade.skipPlayProgress();
  }
}
