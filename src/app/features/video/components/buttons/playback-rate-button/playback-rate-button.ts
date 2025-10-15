import { Component, inject } from '@angular/core';

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

  /**
   * Open playback rate dialog on click.
   */
  onPlaybackRate() {
    this.dialogs.open('playback-rate-dialog');
  }
}
