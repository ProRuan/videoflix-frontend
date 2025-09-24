import { Injectable } from '@angular/core';

import { SuccessDialogConfig } from '@core/auth/interfaces';
import { DialogIds } from '@shared/constants';

import { OverlayManagerBase } from './overlay-manager-base';

/**
 * Class representing a dialog manager service.
 * @extends OverlayManagerBase
 */
@Injectable({
  providedIn: 'root',
})
export class DialogManager extends OverlayManagerBase {
  title: string = '';
  messages: string[] = [];

  setConfig(config: SuccessDialogConfig) {
    this.title = config.title;
    this.messages = config.messages;
  }

  showSuccess(config: SuccessDialogConfig) {
    this.setConfig(config);
    this.open(DialogIds.Success);
  }
}
