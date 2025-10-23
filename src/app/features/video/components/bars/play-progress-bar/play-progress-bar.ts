import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';

import { SliderBase } from '@features/video/directives';
import { VideoPlayerFacade } from '@features/video/services';

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
  private wasPlayingBeforeDrag = signal(false);

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
    this.pointerId.set(event.pointerId);
    this.setPointerMoveEvent(this.progressBar, this.onSlidding);
    this.setPointerCapture(event);
    this.updateCurrentTime(event.clientX);
    this.pausePlayer();
    event.preventDefault();
  }

  /**
   * Pause the player while dragging.
   */
  private pausePlayer() {
    const playing = !this.facade.isPaused();
    this.wasPlayingBeforeDrag.set(playing);
    this.facade.pause();
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
    }
    if (this.isInProgress()) this.facade.play();
    this.wasPlayingBeforeDrag.set(false);
  }

  /**
   * Check if the video is in progress.
   * @returns True if the cached value is true and the video has not ended,
   *          otherwise false.
   */
  private isInProgress() {
    return this.wasPlayingBeforeDrag() && !this.facade.hasEnded();
  }
}
