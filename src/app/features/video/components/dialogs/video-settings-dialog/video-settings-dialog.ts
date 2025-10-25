import { Component, computed, inject, signal } from '@angular/core';

import { VideoDialogIds } from '@features/video/constants';
import {
  FullscreenController,
  VideoDialogConfigurator,
} from '@features/video/services';
import { DialogManager } from '@shared/services';

/**
 * Class representing a video settings dialog component.
 */
@Component({
  selector: 'app-video-settings-dialog',
  imports: [],
  templateUrl: './video-settings-dialog.html',
  styleUrl: './video-settings-dialog.scss',
})
export class VideoSettingsDialog {
  private configurator = inject(VideoDialogConfigurator);
  private dialogs = inject(DialogManager);
  private screenModes = inject(FullscreenController);

  config = signal(this.configurator.playbackRateDialogConfig);
  id = computed(() => this.config().id);
  title = computed(() => this.config().title);
  values = computed(() => this.config().values);

  isClosing = computed(() => this.dialogs.isClosing(this.id()));

  /**
   * Initialize a video settings dialog component.
   */
  ngOnInit() {
    this.setConfig();
  }

  /**
   * Set the video settings dialog configuration.
   */
  private setConfig() {
    const id = this.dialogs.getId() as VideoDialogIds;
    const config = this.configurator.getConfig(id);
    this.config.set(config);
  }

  /**
   * Start closing a dialog on click.
   */
  onCloseStart() {
    this.dialogs.startClosing();
  }

  /**
   * Close a dialog on transition end.
   */
  onCloseEnd() {
    if (this.isClosing()) {
      this.dialogs.close();
      this.screenModes.setLocked(false);
      this.screenModes.showPlayerUIWithTimeout();
    }
  }

  /**
   * Stop an event on click.
   * @param event - The event to be stopped.
   */
  onEventStop(event: Event) {
    event.stopPropagation();
  }

  /**
   * Check a button for being selected.
   * @param index - The button index.
   * @returns True if the button is selected, otherwise false.
   */
  isSelected(index: number) {
    return this.config().isSelected(index);
  }

  /**
   * Update a settings value on click.
   * @param value - The value to be set.
   */
  onSelect(index: number) {
    this.config().onClick(index);
    this.dialogs.startClosing();
  }
}
