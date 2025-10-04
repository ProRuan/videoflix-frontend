import { Component, inject } from '@angular/core';
import { VideoPlayerFacade } from '@features/video/services';

@Component({
  selector: 'app-fullscreen-button',
  imports: [],
  templateUrl: './fullscreen-button.html',
  styleUrl: './fullscreen-button.scss',
})
export class FullscreenButton {
  private facade = inject(VideoPlayerFacade);

  onFullscreen() {
    console.log('toggle fullscreen');

    this.facade.toggleFullscreen();
  }

  isFullscreen() {
    return this.facade.isFullscreen();
  }
}
