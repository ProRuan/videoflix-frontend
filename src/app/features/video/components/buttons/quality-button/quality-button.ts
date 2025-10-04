import { Component, inject, signal } from '@angular/core';
import { VideoPlayerFacade } from '@features/video/services';

@Component({
  selector: 'app-quality-button',
  imports: [],
  templateUrl: './quality-button.html',
  styleUrl: './quality-button.scss',
})
export class QualityButton {
  private facade = inject(VideoPlayerFacade);

  // review on close ...
  // add animation ...

  // rename + double code ...

  // add quality levels (labels) ...
  // improve source change and loading behaviour ...
  //   --> choose right on event ...

  // optional: try quality levels plugin ...

  isOpen = signal(false);

  onClose() {
    this.isOpen.set(false);
  }

  onSpeedChange() {
    this.isOpen.update((value) => !value);
  }

  onSpeedUpdate(value: number) {
    this.facade.setQualityLevel(value);
  }

  isSelected(value: number) {
    const currentPlayBackRate = this.facade.currentPlaybackRate();
    return value === currentPlayBackRate ? true : false;
  }
}
