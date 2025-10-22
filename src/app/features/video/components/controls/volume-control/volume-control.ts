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
    '(document:pointermove)': 'onVolumeMove($event)',
    '(document:pointerup)': 'onVolumeEnd($event)',
  },
})
export class VolumeControl {
  private volContr = inject(VolumeController);

  isDragging = signal(false);
  volumePercent = computed(() => this.volContr.volumePercent());
  isMute = computed(() => this.volContr.isMute());
  activePointerId = signal<number | null>(null);
  // isAdjusting = signal(false);

  @ViewChild('volumeBar') volumeBar!: ElementRef<HTMLDivElement>;

  /**
   * Update volume on mouse move.
   * @param event - The pointer event.
   */
  onVolumeMove(event: PointerEvent) {
    if (!this.isDragging() || this.activePointerId() !== event.pointerId)
      return;
    event.preventDefault();
    this.updateVolume(event.clientX);

    // if (this.isDragging()) this.updateVolume(event);
  }

  /**
   * Update the volume value.
   * @param clientX - The pointer client x.
   */
  private updateVolume(clientX: number) {
    const value = this.getVolume(clientX);
    this.setVolume(value);
    // if (v > 0 && this.facade.isMuted()) this.facade.unmute?.();
    // if (v === 0 && !this.facade.isMuted()) this.facade.mute?.();
  }

  /**
   * Get a volume value.
   * @param clientX - The pointer clientX.
   * @returns The volume value.
   */
  private getVolume(clientX: number) {
    const volumeBar = this.volumeBar.nativeElement;
    const rect = volumeBar.getBoundingClientRect();
    const deltaX = clientX - rect.left;
    const ratio = rect.width > 0 ? deltaX / rect.width : 0;
    return Math.max(0, Math.min(1, ratio));
    // const factor = deltaX / rect.width;
    // return Math.max(0, Math.min(1, factor));
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
  onVolumeEnd(event: PointerEvent) {
    if (!this.isDragging() || this.activePointerId() !== event.pointerId)
      return;
    try {
      this.volumeBar.nativeElement.releasePointerCapture?.(event.pointerId);
    } catch {}
    this.isDragging.set(false);
    this.activePointerId.set(null);

    // this.isDragging.set(false);
  }

  /**
   * Toggle mute state on click.
   */
  onMute() {
    this.volContr.toggleMute();
  }

  /**
   * Update volume on click.
   * @param event - The event.
   */
  onVolume(event: Event) {
    const pointer = event as PointerEvent;
    this.updateVolume(pointer.clientX);
  }

  /**
   * Prepare volume for dragging on mouse down.
   * @param event - The pointer event.
   */
  onVolumeStart(event: PointerEvent) {
    if (!event.isPrimary) return;
    this.activePointerId.set(event.pointerId);
    const pointer = event.target as Element;
    const id = event.pointerId;
    pointer.setPointerCapture(id);
    event.preventDefault();
    this.isDragging.set(true);
    this.updateVolume(event.clientX);

    // event.preventDefault();
    // this.isDragging.set(true);
    // this.updateVolume(event);
  }
}
