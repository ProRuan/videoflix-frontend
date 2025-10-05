import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';

import { VideoPlayerFacade } from '@features/video/services';

/**
 * Class representing a play progress bar component.
 */
@Component({
  selector: 'app-play-progress-bar',
  imports: [],
  templateUrl: './play-progress-bar.html',
  styleUrl: './play-progress-bar.scss',
  host: {
    '(document:mousemove)': 'onScrubbing($event)',
    '(document:mouseup)': 'onScrubbingEnd()',
  },
})
export class PlayProgressBar {
  private facade = inject(VideoPlayerFacade);

  private duration = computed(() => this.facade.duration());
  private isDragging = signal(false);
  private wasPlayingBeforeDrag = signal(false);

  remainingDisplayTime = computed(() => this.facade.remainingDisplayTime());
  currentDisplayTime = computed(() => this.facade.currentDisplayTime());
  bufferPercent = computed(() => this.facade.bufferPercent());
  playedPercent = computed(() => this.facade.getPlayedPercent());

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

  /**
   * Navigate through the video on mouse move.
   * @param event - The mouse event.
   */
  onScrubbing(event: MouseEvent) {
    if (this.isDragging()) this.updateCurrentTime(event);
  }

  /**
   * Update the current time.
   * @param event - The mouse event.
   */
  private updateCurrentTime(event: MouseEvent) {
    const value = this.getCurrentTime(event);
    this.setCurrentTime(value);
  }

  /**
   * Get a current time.
   * @param event - The mouse event.
   * @returns The current time.
   */
  private getCurrentTime(event: MouseEvent) {
    const progressBar = this.progressBar.nativeElement;
    const rect = progressBar.getBoundingClientRect();
    const deltaX = event.clientX - rect.left;
    const relativeProgress = deltaX / rect.width;
    const absoluteProgress = relativeProgress * this.duration();
    return Math.min(this.duration(), absoluteProgress);
  }

  /**
   * Set the current time.
   * @param value - The value to be set.
   */
  private setCurrentTime(value: number) {
    this.facade.setCurrentTime(value);
  }

  onScrubbingEnd() {
    if (this.isInProgress()) this.facade.play();
    this.wasPlayingBeforeDrag.set(false);
    this.isDragging.set(false);
  }

  /**
   * Check if the video is in progress.
   * @returns True if the cached value is true and the video has not ended,
   *          otherwise false.
   */
  private isInProgress() {
    return this.wasPlayingBeforeDrag() && !this.facade.hasEnded();
  }

  /**
   * Prepare the player for dragging the play progress.
   * @param event - The mouse event.
   */
  onScrubbingStart(event: MouseEvent) {
    event.preventDefault();
    this.isDragging.set(true);
    this.pausePlayer();
    this.updateCurrentTime(event);
  }

  /**
   * Pause the player while dragging.
   */
  private pausePlayer() {
    const value = !this.facade.isPaused();
    this.wasPlayingBeforeDrag.set(value);
    this.facade.pause();
  }

  /**
   * Updates the current time on click.
   * @param event - The mouse event.
   */
  onCurrentTime(event: MouseEvent) {
    this.updateCurrentTime(event);
  }
}
