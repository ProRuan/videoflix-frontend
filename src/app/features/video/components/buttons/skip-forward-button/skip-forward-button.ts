import { Component, inject } from '@angular/core';
import { VideoPlayerFacade } from '@features/video/services';

@Component({
  selector: 'app-skip-forward-button',
  imports: [],
  templateUrl: './skip-forward-button.html',
  styleUrl: './skip-forward-button.scss',
})
export class SkipForwardButton {
  private facade = inject(VideoPlayerFacade);

  onForwardSkip() {
    this.facade.skipForward();
  }
}
