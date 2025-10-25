import { Component, inject } from '@angular/core';

import { VideoDialogIds } from '@features/video/constants';
import { FullscreenController } from '@features/video/services';
import { DialogManager } from '@shared/services';

/**
 * Class representing a quality button component.
 */
@Component({
  selector: 'app-quality-button',
  imports: [],
  templateUrl: './quality-button.html',
  styleUrl: './quality-button.scss',
})
export class QualityButton {
  private dialogs = inject(DialogManager);
  private screenModes = inject(FullscreenController);

  /**
   * Open a quality levels dialog on click.
   */
  onQuality() {
    this.screenModes.setLocked(true);
    this.dialogs.open(VideoDialogIds.QualityLevels);
  }
}
