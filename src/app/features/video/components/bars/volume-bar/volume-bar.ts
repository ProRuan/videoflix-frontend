import { Component, computed, ElementRef, inject, signal } from '@angular/core';

import { VolumeController } from '@features/video/services';

/**
 * Class representing a volume bar component.
 */
@Component({
  selector: 'app-volume-bar',
  imports: [],
  templateUrl: './volume-bar.html',
  styleUrl: './volume-bar.scss',
  host: {
    '(click)': 'onVolume($event)',
    '(pointerdown)': 'onSlideStart($event)',
    '(pointerup)': 'onSlideEnd($event)',
  },
})
export class VolumeBar {
  private volumes = inject(VolumeController);

  pointerId = signal<number | null>(null);
  volumePercent = computed(() => this.volumes.volumePercent());

  onSlidding = (event: PointerEvent) => this.slide(event);

  /**
   * Creates a volume bar component.
   * @param volumeBar - The element reference of the volume bar.
   */
  constructor(private volumeBar: ElementRef<HTMLDivElement>) {}

  /**
   * Update the volume on click.
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
   * Start dragging the slider and update the volume on pointer down.
   * @param event - The pointer event.
   */
  onSlideStart(event: PointerEvent) {
    if (!event.isPrimary) return;
    this.pointerId.set(event.pointerId);
    this.setPointerMoveEvent(this.onSlidding);
    this.setPointerCapture(event);
    this.updateVolume(event.clientX);
    event.preventDefault();
  }

  /**
   * Set the pointer move event listener.
   * @param fn - The function to be set.
   */
  private setPointerMoveEvent(fn: ((event: PointerEvent) => void) | null) {
    this.volumeBar.nativeElement.onpointermove = fn;
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
   * Continue dragging the slider and update the volume on pointer move.
   * @param event - The pointer event.
   */
  private slide(event: PointerEvent) {
    if (this.isPointerId(event.pointerId)) {
      event.preventDefault();
      this.updateVolume(event.clientX);
    }
  }

  /**
   * Check if a pointer id matches the active pointer id.
   * @param id - The pointer id.
   * @returns True if the pointer id matches the active pointer id,
   *          otherwise false.
   */
  private isPointerId(id: number) {
    return this.pointerId() === id;
  }

  /**
   * End dragging the slider on pointer up.
   */
  onSlideEnd(event: PointerEvent) {
    if (this.isPointerId(event.pointerId)) {
      this.releasePointerCapture(event.pointerId);
      this.setPointerMoveEvent(null);
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
