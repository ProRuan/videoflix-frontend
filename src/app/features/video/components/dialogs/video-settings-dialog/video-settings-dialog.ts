import { Component, computed, inject, input } from '@angular/core';

import { VideoSettingsDialogConfig } from '@features/video/interfaces';
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
  private dialogs = inject(DialogManager);

  config = input.required<VideoSettingsDialogConfig>();
  id = computed(() => this.config().id);
  title = computed(() => this.config().title);
  values = computed(() => this.config().values);

  isClosing = computed(() => this.dialogs.isClosing(this.id()));

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
   * Check a button for being selected (disabled).
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
