import { Component, computed, inject } from '@angular/core';

import {
  PlayButton,
  SkipBackwardsButton,
  SkipForwardButton,
} from '@features/video/components';
import { FullscreenController } from '@features/video/services';

@Component({
  selector: 'app-video-player-touch-control',
  imports: [PlayButton, SkipBackwardsButton, SkipForwardButton],
  templateUrl: './video-player-touch-control.html',
  styleUrl: './video-player-touch-control.scss',
  host: {
    '[class.fade-out]': 'isLeaving()',
    '[class.fade-in]': 'isEntering()',
    '(transitionend)': 'onLeave()',
  },
})
export class VideoPlayerTouchControl {
  private screenModes = inject(FullscreenController);

  // new
  isLeaving = computed(() => this.screenModes.isLeaving());
  isEntering = computed(() => this.screenModes.isEntering());

  onLeave() {
    this.screenModes.hidePlayerUI();
  }
}
