import {
  Component,
  computed,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';

import { VideoPlayerFacade } from '@features/video/services';
import { SliderBase } from '@shared/directives';

/**
 * Class representing a play progress bar component.
 * @extends SliderBase
 */
@Component({
  selector: 'app-play-progress-bar',
  imports: [],
  templateUrl: './play-progress-bar.html',
  styleUrl: './play-progress-bar.scss',
})
export class PlayProgressBar extends SliderBase {
  private facade = inject(VideoPlayerFacade);

  private duration = computed(() => this.facade.duration());

  remainingDisplayTime = computed(() => this.facade.remainingDisplayTime());
  currentDisplayTime = computed(() => this.facade.currentDisplayTime());
  bufferPercent = computed(() => this.facade.bufferPercent());
  playedPercent = computed(() => this.facade.playedPercent());

  onSlidding = (event: PointerEvent) => this.scrub(event);

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

  /**
   * Update the current time on click.
   * @param event - The event.
   */
  onCurrentTime(event: Event) {
    const pointer = event as PointerEvent;
    this.updateCurrentTime(pointer.clientX);
  }

  /**
   * Update the current time.
   * @param clientX - The pointer client x.
   */
  private updateCurrentTime(clientX: number) {
    const time = this.getCurrentTime(clientX);
    this.setCurrentTime(time);
  }

  /**
   * Get a current time.
   * @param clientX - The pointer client x.
   * @returns The current time.
   */
  private getCurrentTime(clientX: number) {
    const progressBar = this.progressBar.nativeElement;
    const rect = progressBar.getBoundingClientRect();
    const ratio = this.getRatio(clientX, rect);
    return ratio * this.duration();
  }

  /**
   * Set the current time.
   * @param value - The value to be set.
   */
  private setCurrentTime(value: number) {
    this.facade.setCurrentTime(value);
  }

  /**
   * Start navigating through the video on pointer down.
   * @param event - The pointer event.
   */
  onScrubStart(event: PointerEvent) {
    if (!event.isPrimary) return;
    this.facade.pause();
    this.pointerId.set(event.pointerId);
    this.setPointerMoveEvent(this.progressBar, this.onSlidding);
    this.setPointerCapture(event);
    this.updateCurrentTime(event.clientX);
    event.preventDefault();
  }

  /**
   * Navigate through the video on pointer move.
   * @param event - The pointer event.
   */
  scrub(event: PointerEvent) {
    if (this.isPointerId(event.pointerId)) {
      event.preventDefault();
      this.updateCurrentTime(event.clientX);
    }
  }

  /**
   * End scrubbing on pointer up.
   * @param event - The pointer event.
   */
  onScrubEnd(event: PointerEvent) {
    if (this.isPointerId(event.pointerId)) {
      this.releasePointerCapture(this.progressBar, event.pointerId);
      this.setPointerMoveEvent(this.progressBar, null);
      this.pointerId.set(null);
      this.facade.continuePlaying();
    }
  }
}
