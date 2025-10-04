import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { VideoPlayerFacade } from '@features/video/services';

@Component({
  selector: 'app-volume-button',
  imports: [],
  templateUrl: './volume-button.html',
  styleUrl: './volume-button.scss',
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:mouseup)': 'stopDrag()',
  },
})
export class VolumeButton {
  private facade = inject(VideoPlayerFacade);

  dragging: boolean = false;

  @ViewChild('volumeBar') volumeBar!: ElementRef<HTMLDivElement>;

  get volume() {
    return this.facade.getVolume() * 100;
  }

  onMute() {
    this.facade.toggleMute();
  }

  isMuted() {
    return this.facade.isMuted();
  }

  onVolumeSelect(event: MouseEvent) {}

  updateVolume(event: MouseEvent) {
    const bar = this.volumeBar.nativeElement;
    const rect = bar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    this.facade.setVolume(percentage);
  }

  onDragStart(event: MouseEvent) {
    event.preventDefault();
    this.dragging = true;
    this.updateVolume(event);
  }

  onDragPrevent(event: Event) {
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (this.dragging) this.updateVolume(event);
  }

  stopDrag() {
    this.dragging = false;
  }
}
