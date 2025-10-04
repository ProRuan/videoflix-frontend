import { Component, inject, signal } from '@angular/core';
import { VideoPlayerFacade } from '@features/video/services';

@Component({
  selector: 'app-speed-button',
  imports: [],
  templateUrl: './speed-button.html',
  styleUrl: './speed-button.scss',
  host: {
    '(document:click)': 'onClose()',
  },
})
export class SpeedButton {
  private facade = inject(VideoPlayerFacade);

  // review on close ...
  // add animation ...

  isOpen = signal(false);

  onClose() {
    this.isOpen.set(false);
  }

  onSpeedChange() {
    this.isOpen.update((value) => !value);
  }

  onSpeedUpdate(value: number) {
    this.facade.setPlaybackRate(value);
  }

  isSelected(value: number) {
    const currentPlayBackRate = this.facade.currentPlaybackRate();
    return value === currentPlayBackRate ? true : false;
  }
}
