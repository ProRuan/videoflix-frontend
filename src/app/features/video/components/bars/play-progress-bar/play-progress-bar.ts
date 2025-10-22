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
    '(document:pointermove)': 'onScrubbing($event)',
    '(document:pointerup)': 'onScrubbingEnd($event)',
  },
})
export class PlayProgressBar {
  private facade = inject(VideoPlayerFacade);

  private duration = computed(() => this.facade.duration());
  private isDragging = signal(false);
  private wasPlayingBeforeDrag = signal(false);
  private activePointerId = signal<number | null>(null);

  currentTime = signal(0);
  remainingDisplayTime = computed(() => this.facade.remainingDisplayTime());
  currentDisplayTime = computed(() => this.facade.currentDisplayTime());
  bufferPercent = computed(() => this.facade.bufferPercent());
  playedPercent = computed(() => this.facade.playedPercent());

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

  /**
   * Navigate through the video on mouse move.
   * @param event - The pointer event.
   */
  onScrubbing(event: PointerEvent) {
    if (!this.isDragging() || this.activePointerId() !== event.pointerId)
      return;
    event.preventDefault();
    this.updateCurrentTime(event.clientX);
    // if (this.isDragging()) this.updateCurrentTime(event);
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
    const deltaX = clientX - rect.left;
    const ratio = rect.width > 0 ? deltaX / rect.width : 0;
    const clampedRatio = Math.max(0, Math.min(1, ratio));
    return clampedRatio * this.duration();
    // const relativeProgress = deltaX / rect.width;
    // const absoluteProgress = relativeProgress * this.duration();
    // return Math.min(this.duration(), absoluteProgress);
  }

  /**
   * Set the current time.
   * @param value - The value to be set.
   */
  private setCurrentTime(value: number) {
    this.currentTime.set(value);
    this.facade.setCurrentTime(value);
  }

  onScrubbingEnd(event: PointerEvent) {
    if (!this.isDragging() || this.activePointerId() !== event.pointerId)
      return;

    try {
      (this.progressBar.nativeElement as Element).releasePointerCapture?.(
        event.pointerId
      );
    } catch (_) {}

    this.isDragging.set(false);
    this.activePointerId.set(null);

    if (this.isInProgress()) this.facade.play();
    this.wasPlayingBeforeDrag.set(false);

    // if (this.isInProgress()) this.facade.play();
    // this.wasPlayingBeforeDrag.set(false);
    // this.isDragging.set(false);
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
   * @param event - The pointer event.
   */
  onScrubbingStart(event: PointerEvent) {
    if (!event.isPrimary) return;
    const pointer = event.target as Element;
    const id = event.pointerId;
    pointer.setPointerCapture?.(id);
    this.activePointerId.set(id);
    event.preventDefault();

    this.isDragging.set(true);
    this.pausePlayer();

    this.updateCurrentTime(event.clientX);

    // event.preventDefault();
    // this.isDragging.set(true);
    // this.pausePlayer();
    // this.updateCurrentTime(event);
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
   * Updates the current time on click.
   * @param event - The event.
   */
  onCurrentTime(event: Event) {
    const pointer = event as PointerEvent;
    this.updateCurrentTime(pointer.clientX);
  }
}
