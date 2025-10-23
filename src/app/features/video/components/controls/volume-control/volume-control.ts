import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';

import { VolumeController } from '@features/video/services';

import { MuteButton } from '../../buttons';

/**
 * Class representing a volume control component.
 */
@Component({
  selector: 'app-volume-control',
  imports: [MuteButton],
  templateUrl: './volume-control.html',
  styleUrl: './volume-control.scss',
  host: {
    '(document:pointermove)': 'onVolumeMove($event)',
    '(document:pointerup)': 'onVolumeEnd($event)',
  },
})
export class VolumeControl {
  private volumes = inject(VolumeController);

  volumePercent = computed(() => this.volumes.volumePercent());
  pointerId = signal<number | null>(null);

  @ViewChild('volumeBar') volumeBar!: ElementRef<HTMLDivElement>;

  /**
   * Update volume on click.
   * @param event - The event.
   */
  onVolume(event: Event) {
    const pointer = event as PointerEvent;
    this.updateVolume(pointer.clientX);
  }

  /**
   * Update the volume value.
   * @param clientX - The pointer client x.
   */
  private updateVolume(clientX: number) {
    const value = this.getVolume(clientX);
    this.setVolume(value);
  }

  /**
   * Get a volume value.
   * @param clientX - The pointer clientX.
   * @returns The volume value.
   */
  private getVolume(clientX: number) {
    const volumeBar = this.volumeBar.nativeElement;
    const rect = volumeBar.getBoundingClientRect();
    const ratio = this.getRatio(clientX, rect);
    return Math.max(0, Math.min(1, ratio));
  }

  /**
   * Get a volume ratio.
   * @param clientX - The pointer client x.
   * @param rect - The volume bar as rectangle.
   * @returns The volume ratio.
   */
  private getRatio(clientX: number, rect: DOMRect) {
    const deltaX = clientX - rect.left;
    return rect.width > 0 ? deltaX / rect.width : 0;
  }

  /**
   * Set the volume value.
   * @param value - The volume value to be set.
   */
  private setVolume(value: number) {
    this.volumes.setVolume(value);
  }

  /**
   * Prepare volume for dragging on pointer down.
   * @param event - The pointer event.
   */
  onVolumeStart(event: PointerEvent) {
    if (!event.isPrimary) return;
    this.pointerId.set(event.pointerId);
    this.setPointerCapture(event);
    this.updateVolume(event.clientX);
    event.preventDefault();
  }

  /**
   * Set the pointer capture.
   * @param event - The pointer event.
   */
  private setPointerCapture(event: PointerEvent) {
    const pointer = event.target as Element;
    pointer.setPointerCapture(event.pointerId);
  }

  /**
   * Update volume on pointer move.
   * @param event - The pointer event.
   */
  onVolumeMove(event: PointerEvent) {
    if (this.isPointerId(event.pointerId)) {
      event.preventDefault();
      this.updateVolume(event.clientX);
    }
  }

  /**
   * Check if a pointer id matches the active pointer id.
   * @param id - The pointer id.
   * @returns True if the pointer id matches the pointer id, otherwise false.
   */
  private isPointerId(id: number) {
    return this.pointerId() === id;
  }

  /**
   * End volume dragging.
   */
  onVolumeEnd(event: PointerEvent) {
    if (this.isPointerId(event.pointerId)) {
      this.releasePointerCapture(event.pointerId);
      this.pointerId.set(null);
    }
  }

  /**
   * Release the pointer capture.
   * @param id - The pointer id.
   */
  private releasePointerCapture(id: number) {
    const volumeBar = this.volumeBar.nativeElement;
    if (volumeBar.hasPointerCapture(id)) {
      volumeBar.releasePointerCapture(id);
    }
  }
}
