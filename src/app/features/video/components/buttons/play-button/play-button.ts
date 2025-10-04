import { Component, inject } from '@angular/core';
import { VideoPlayerFacade } from '@features/video/services';

@Component({
  selector: 'app-play-button',
  imports: [],
  templateUrl: './play-button.html',
  styleUrl: './play-button.scss',
})
export class PlayButton {
  private facade = inject(VideoPlayerFacade);

  onPlay() {
    this.facade.togglePlay();
  }

  isPaused() {
    return this.facade.hasStarted() && !this.facade.isPaused();
  }

  isReplay() {
    return this.facade.hasEnded();
  }
}
