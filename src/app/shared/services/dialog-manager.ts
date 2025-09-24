import { Injectable } from '@angular/core';

import { DialogIds } from '@shared/constants';
import { DialogConfig } from '@shared/interfaces';

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

  setConfig(config: DialogConfig) {
    this.title = config.title;
    this.messages = config.messages;
  }

  showSuccess(config: DialogConfig) {
    this.setConfig(config);
    this.open(DialogIds.Success);
  }
}
