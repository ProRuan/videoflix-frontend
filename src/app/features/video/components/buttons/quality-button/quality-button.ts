import { Component, inject } from '@angular/core';

import { OverlayManagerBase } from '@shared/services';

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
  private dialogs = inject(OverlayManagerBase);

  /**
   * Open a quality levels dialog on click.
   */
  onQuality() {
    this.dialogs.open('quality-levels-dialog');
  }
}
