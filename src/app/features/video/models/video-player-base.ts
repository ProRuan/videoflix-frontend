import { computed, ElementRef, signal } from '@angular/core';
import Player from 'video.js/dist/types/player';

export abstract class VideoPlayerBase {
  abstract video: ElementRef;
  abstract player: Player;
  abstract options: any;

  clickTimeout: ReturnType<typeof setTimeout> = -1;
  skipSeconds: number = 10;

  currentTime = signal(0);
  currentTimeIntervalId!: ReturnType<typeof setInterval>;
  displayedCurrentTime = computed(() => Math.floor(this.currentTime()));
  remainingTime = computed(
    () => Math.floor(this.duration()) - Math.floor(this.currentTime())
  );

  duration = signal(0);

  currentBuffer = signal(0);
  currentBufferPercentage = computed(
    () => (this.currentBuffer() / this.duration()) * 100
  );

  /**
   * Play a video.
   */
  play() {
    this.player.play();
    this.setCurrentTimeInterval();
  }

  /**
   * Pause a video.
   */
  pause() {
    this.player.pause();
    this.clearCurrentTimeInterval();
  }

  /**
   * Check if a video is paused.
   * @returns A boolean value.
   */
  isPaused() {
    return this.player.paused();
  }

  /**
   * Toggle between play and pause.
   */
  togglePlay() {
    this.isPaused() ? this.play() : this.pause();
  }

  togglePlayLate() {
    if (this.isClickTimeout()) return;
    this.clickTimeout = setTimeout(() => {
      this.resetClickTimeout();
      this.togglePlay();
    }, 250);
  }

  resetClickTimeout() {
    this.clickTimeout = -1;
  }

  clearClickTimeout() {
    clearTimeout(this.clickTimeout);
    this.resetClickTimeout();
  }

  isClickTimeout() {
    return this.clickTimeout !== -1;
  }

  getCurrentTime() {
    return this.player.currentTime();
  }

  setCurrentTime(value: number) {
    const seconds = this.getCurrentTime();
    if (seconds) {
      this.player.currentTime(seconds + value);
    }
  }

  skipBackward() {
    this.setCurrentTime(-this.skipSeconds);
  }

  skipForward() {
    this.setCurrentTime(this.skipSeconds);
  }

  isMuted() {
    return this.player.muted();
  }

  toggleMute() {
    const muted = this.isMuted() ? true : false;
    this.player.muted(!muted);
  }

  getVolume() {
    return this.player.volume();
  }

  setVolume(value: number) {
    this.player.volume(value);
  }

  getPlaybackRate() {
    return this.player.playbackRate();
  }

  setPlaybackRate(value: number) {
    this.player.playbackRate(value);
  }

  setCurrentTimeInterval() {
    this.currentTimeIntervalId = setInterval(() => {
      const currentTime = this.getCurrentTime();
      if (currentTime) {
        this.currentTime.set(currentTime);
      }
    }, 100);
  }

  resetCurrentTimeIntervalId() {
    this.currentTimeIntervalId = -1;
  }

  isCurrentTimeIntervalId() {
    return this.currentTimeIntervalId !== -1;
  }

  clearCurrentTimeInterval() {
    clearInterval(this.currentTimeIntervalId);
    this.resetCurrentTimeIntervalId();
  }

  getCurrentBuffer() {
    return this.player.bufferedEnd();
  }

  // set interval id ...
  setCurrentBufferInterval() {
    const id = setInterval(() => {
      const currentBuffer = this.getCurrentBuffer();
      if (currentBuffer) {
        this.currentBuffer.set(currentBuffer);
      }
      if (Math.floor(this.currentBuffer()) === Math.floor(this.duration())) {
        console.log('buffer complete');
        clearInterval(id);
      }
    }, 100);
  }
}
