import { Component, inject } from '@angular/core';

import { VideoDialogIds } from '@features/video/constants';
import { FullscreenController } from '@features/video/services';
import { DialogManager } from '@shared/services';

/**
 * Class representing a playback rate button component.
 */
@Component({
  selector: 'app-playback-rate-button',
  imports: [],
  templateUrl: './playback-rate-button.html',
  styleUrl: './playback-rate-button.scss',
})
export class PlaybackRateButton {
  private dialogs = inject(DialogManager);
  private screenModes = inject(FullscreenController);

  /**
   * Open playback rate dialog on click.
   */
  onPlaybackRate() {
    this.screenModes.setLocked(true);
    this.dialogs.open(VideoDialogIds.PlaybackRate);
  }
}
