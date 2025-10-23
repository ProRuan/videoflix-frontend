import { Component, computed, inject } from '@angular/core';

import { VolumeController } from '@features/video/services';

/**
 * Class representing a mute button component.
 */
@Component({
  selector: 'app-mute-button',
  imports: [],
  templateUrl: './mute-button.html',
  styleUrl: './mute-button.scss',
})
export class MuteButton {
  private volumes = inject(VolumeController);

  isMute = computed(() => this.volumes.isMute());

  /**
   * Toggle mute state on click.
   */
  onMute() {
    this.volumes.toggleMute();
  }
}
