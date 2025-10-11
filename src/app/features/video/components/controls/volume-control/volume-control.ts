import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';

import { VolumeController } from '@features/video/services';

/**
 * Class representing a volume button component.
 */
@Component({
  selector: 'app-volume-control',
  imports: [],
  templateUrl: './volume-control.html',
  styleUrl: './volume-control.scss',
  host: {
    '(document:mousemove)': 'onVolumeMove($event)',
    '(document:mouseup)': 'onVolumeEnd()',
  },
})
export class VolumeControl {
  private volContr = inject(VolumeController);

  isDragging = signal(false);
  volumePercent = computed(() => this.volContr.volumePercent());
  isMute = computed(() => this.volContr.isMute());

  @ViewChild('volumeBar') volumeBar!: ElementRef<HTMLDivElement>;

  /**
   * Update volume on mouse move.
   * @param event - The mouse event.
   */
  onVolumeMove(event: MouseEvent) {
    if (this.isDragging()) this.updateVolume(event);
  }

  /**
   * Update the volume value.
   * @param event - The mouse event.
   */
  private updateVolume(event: MouseEvent) {
    const value = this.getVolume(event);
    this.setVolume(value);
  }

  /**
   * Get a volume value.
   * @param event - The mouse event.
   * @returns The volume value.
   */
  private getVolume(event: MouseEvent) {
    const volumeBar = this.volumeBar.nativeElement;
    const rect = volumeBar.getBoundingClientRect();
    const deltaX = event.clientX - rect.left;
    const factor = deltaX / rect.width;
    return Math.max(0, Math.min(1, factor));
  }

  /**
   * Set the volume value.
   * @param value - The volume value to be set.
   */
  private setVolume(value: number) {
    this.volContr.setVolume(value);
  }

  /**
   * End volume dragging.
   */
  onVolumeEnd() {
    this.isDragging.set(false);
  }

  /**
   * Toggle mute state on click.
   */
  onMute() {
    this.volContr.toggleMute();
  }

  /**
   * Update volume on click.
   * @param event - The mouse event.
   */
  onVolume(event: MouseEvent) {
    this.updateVolume(event);
  }

  /**
   * Prepare volume for dragging on mouse down.
   * @param event - The mouse event.
   */
  onVolumeStart(event: MouseEvent) {
    event.preventDefault();
    this.isDragging.set(true);
    this.updateVolume(event);
  }
}
