import { Injectable, signal, WritableSignal } from '@angular/core';

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
  title: WritableSignal<string> = signal('');
  messages: WritableSignal<string[]> = signal([]);
  label: WritableSignal<string> = signal('');
  url: WritableSignal<string> = signal('');

  /**
   * Set a dialog configuration.
   * @param config - The dialog configuration to be set.
   */
  setConfig(config: DialogConfig) {
    this.title.set(config.title);
    this.messages.set(config.messages);
    this.label.set(config.label);
    this.url.set(config.url);
  }

  /**
   * Show a success dialog.
   * @param config - The dialog configuration to be set.
   */
  showSuccess(config: DialogConfig) {
    this.setConfig(config);
    this.open(DialogIds.Success);
  }
}
