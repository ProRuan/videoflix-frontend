import { Component, ViewChild } from '@angular/core';

import { VolumeBar } from '../../bars';
import { MuteButton } from '../../buttons';

/**
 * Class representing a volume control component.
 */
@Component({
  selector: 'app-volume-control',
  imports: [MuteButton, VolumeBar],
  templateUrl: './volume-control.html',
  styleUrl: './volume-control.scss',
})
export class VolumeControl {
  @ViewChild('volumeBar') volumeBar!: VolumeBar;
}
