import { Component, inject } from '@angular/core';
import { VideoPlayerFacade } from '@features/video/services';

@Component({
  selector: 'app-skip-backwards-button',
  imports: [],
  templateUrl: './skip-backwards-button.html',
  styleUrl: './skip-backwards-button.scss',
})
export class SkipBackwardsButton {
  private facade = inject(VideoPlayerFacade);

  onBackwardSkip() {
    this.facade.skipBackwards();
  }
}
