import { computed, Injectable, OnDestroy, signal } from '@angular/core';

import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { SourceObject } from 'video.js/dist/types/tech/tech';

import { IntervalId, TimeoutId } from '@shared/constants';

import { VideoPlayerOptions } from '../interfaces';
import { getHours, getMinutes, getSeconds } from '../utils';

/**
 * Class representing a video player facade service.
 *
 * Provides a player´s properties and methods.
 */
@Injectable({
  providedIn: 'root',
})
export class VideoPlayerFacade implements OnDestroy {
  private readonly stepSize: number = 10;

  private progressIntervalId: IntervalId = -1;
  private playTimeoutId: TimeoutId = -1;

  playerBox = signal<HTMLDivElement | null>(null);
  player = signal<Player | null>(null);
  title = signal('');
  sources = signal<SourceObject[]>([]);

  currentDisplayTime = signal('');
  remainingDisplayTime = signal('');
  duration = signal(0);
  buffered = signal(0);
  currentTime = signal(0);
  isPlaying = signal(false);
  wasPlayingBeforePause = signal(false);
  hasEnded = signal(false);
  bufferPercent = computed(() => this.getBufferedPercent());
  playedPercent = computed(() => this.getPlayedPercent());

  volume = signal(0.5);
  cachedVolume = signal(0.5);
  volumePercent = computed(() => this.volume() * 100);
  isMute = computed(() => this.volume() === 0);

  /**
   * Creates a video player facade service.
   */
  constructor() {
    this.setProgressInterval();
  }

  /**
   * Set the progress interval for updating play progress parameters.
   */
  private setProgressInterval() {
    this.progressIntervalId = setInterval(() => {
      this.updatePlayProgress();
      this.updatePlayProgressEnd();
    }, 1000 / 60);
  }

  /**
   * Update the video´s play progress parameters.
   */
  private updatePlayProgress() {
    this.currentDisplayTime.update(() => this.getCurrentDisplayTime());
    this.remainingDisplayTime.update(() => this.getRemainingDisplayTime());
    this.currentTime.update(() => this.getCurrentTime());
    this.buffered.update(() => this.getBufferEnd());
  }

  /**
   * Update the video´s play progress end.
   */
  private updatePlayProgressEnd() {
    this.hasEnded.update(() => this.hasProperty('ended'));
    if (this.hasEnded()) {
      this.isPlaying.set(false);
    }
  }

  /**
   * Check the player for a specific property value.
   * @param key - The player´s property key.
   * @returns True if the player´s property value is existing and true,
   *          otherwise false.
   */
  private hasProperty(key: keyof Player): boolean {
    return this.player()?.[key]() ?? false;
  }

  /**
   * Set the player box.
   * @param element - The element to be set.
   */
  setPlayerBox(element: HTMLDivElement) {
    this.playerBox.set(element);
  }

  /**
   * Set the player and its options.
   * @param player - The element to be set.
   * @param options - The options to be set.
   */
  setPlayer(player: HTMLVideoElement, options: VideoPlayerOptions) {
    this.player.set(videojs(player, options));
    this.setVolume(0.5);
  }

  /**
   * Set the available video sources.
   * @param sources - The video sources to be set.
   */
  setSources(sources: SourceObject[]) {
    this.sources.set(sources);
  }

  /**
   * Set the video title.
   * @param value - The value to be set.
   */
  setTitle(value: string) {
    this.title.set(value);
  }

  /**
   * Toggle between play and pause with delay.
   * @returns Void if the player has a play timeout.
   */
  togglePlayWithDelay() {
    if (this.hasPlayTimeout()) return;
    this.playTimeoutId = setTimeout(() => this.togglePlay(), 250);
  }

  /**
   * Check if a play timeout is set.
   * @returns True if the play timeout id is greater than -1, otherwise false.
   */
  private hasPlayTimeout() {
    return this.playTimeoutId > -1;
  }

  /**
   * Toggle between play and pause.
   */
  togglePlay() {
    this.clearPlayTimeout();
    this.isPaused() ? this.play() : this.pause();
  }

  /**
   * Clear the play timeout.
   */
  clearPlayTimeout() {
    clearTimeout(this.playTimeoutId);
    this.playTimeoutId = -1;
  }

  /**
   * Check if the video is paused.
   * @returns True if the video is paused, otherwise false.
   */
  isPaused() {
    return this.hasProperty('paused');
  }

  /**
   * Play the video.
   */
  play() {
    this.player()?.play();
    this.isPlaying.set(true);
  }

  /**
   * Pause the video.
   */
  pause() {
    this.player()?.pause();
    this.isPlaying.set(false);
  }

  /**
   * Get the current display time of the video.
   * @returns The current display time of the video.
   */
  private getCurrentDisplayTime() {
    const currentTime = this.getCurrentTime();
    return this.getDisplayTime(currentTime);
  }

  /**
   * Get the current time of a video.
   * @returns The current time of the video.
   */
  getCurrentTime() {
    return this.getProperty('currentTime');
  }

  /**
   * Get a player´s property value.
   * @param key - The players´s property key.
   * @returns The player´s property value.
   */
  private getProperty(key: keyof Player): number {
    return this.player()?.[key]() ?? 0;
  }

  /**
   * Get a display time of a video.
   * @param exactTime - The exact time.
   * @returns The display time of the video.
   */
  private getDisplayTime(exactTime: number) {
    const time = Math.round(exactTime);
    if (isNaN(time)) return '0:00';
    return this.getFormattedDisplayTime(time);
  }

  /**
   * Get a formatted display time.
   * @param time - The time to be formatted.
   * @returns The formatted display time.
   */
  private getFormattedDisplayTime(time: number) {
    const hours = getHours(time);
    const minutes = getMinutes(time);
    const seconds = getSeconds(time);
    const timeParts = [hours, minutes, seconds];
    return timeParts.filter((t) => t !== null).join(':');
  }

  /**
   * Get the remaining display time of a video.
   * @returns The remainging display time of the video.
   */
  private getRemainingDisplayTime() {
    const remainingTime = this.getRemainingTime();
    return this.getDisplayTime(remainingTime);
  }

  /**
   * Get the remaining of a video.
   * @returns The remaining time of the video.
   */
  private getRemainingTime() {
    return this.getProperty('remainingTime');
  }

  /**
   * Listen to duration change events to update the video`s duration.
   */
  listenToDurationChange() {
    this.player()?.on('durationchange', () => this.setDuration());
  }

  /**
   * Set the duration of the video.
   */
  private setDuration() {
    const duration = this.getDuration();
    this.duration.set(duration);
  }

  /**
   * Get the duration of the video.
   * @returns The duration of the video.
   */
  private getDuration() {
    return this.getProperty('duration');
  }

  /**
   * Get the buffer end of a video.
   * @returns The buffer end of the video.
   */
  private getBufferEnd() {
    return this.getProperty('bufferedEnd');
  }

  /**
   * Get the buffered percent of the video.
   * @returns The buffered percent of the video.
   */
  private getBufferedPercent() {
    return (this.buffered() / this.duration()) * 100;
  }

  /**
   * Set the current time of the video.
   * @param value - The value to be set.
   */
  setCurrentTime(value: number) {
    this.player()?.currentTime(value);
  }

  /**
   * Get the played percent of the video.
   * @returns The played percent of the video.
   */
  private getPlayedPercent() {
    return (this.currentTime() / this.duration()) * 100;
  }

  /**
   * Skip the video´s play progress.
   * @param backwards - A boolean value.
   */
  skipPlayProgress(backwards: boolean = false) {
    const time = this.getSkipTargetTime(backwards);
    this.setCurrentTime(time);
  }

  /**
   * Get the skip target time.
   * @param backwards - A boolean value.
   * @returns The skip target time.
   */
  private getSkipTargetTime(backwards: boolean = false) {
    const currentTime = this.getCurrentTime();
    const timeStep = this.getTimeStep(backwards);
    return currentTime + timeStep;
  }

  /**
   * Get a time step for skipping the play progress.
   * @param backwards - A boolean value.
   * @returns The time step for skipping the play progress.
   */
  private getTimeStep(backwards: boolean = false) {
    return backwards ? -this.stepSize : this.stepSize;
  }

  /**
   * Toggle between mute and volume.
   */
  toggleMute() {
    if (this.isMuted()) {
      this.updateVolume(false, this.cachedVolume());
    } else {
      this.updateVolume(true, 0, this.getVolume());
    }
  }

  /**
   * Check if the video is muted.
   * @returns True if the video is muted, otherwise false.
   */
  private isMuted() {
    return this.hasProperty('muted');
  }

  /**
   * Update the volume parameters.
   * @param muted - A boolean value.
   * @param volume - The volume to be set.
   * @param currentVolume - The current volume.
   */
  private updateVolume(muted: boolean, volume: number, currentVolume?: number) {
    this.setMute(muted);
    this.cachedVolume.update((value) => currentVolume ?? value);
    this.setVolume(volume);
  }

  /**
   * Set the mute state of the video.
   * @param value - The value to be set.
   */
  private setMute(value: boolean) {
    this.player()?.muted(value);
  }

  /**
   * Set the volume of the video.
   * @param value - The value to be set.
   */
  setVolume(value: number) {
    this.volume.set(value);
    this.player()?.volume(value);
    if (this.volume() > 0) {
      this.setMute(false);
    }
  }

  /**
   * Get the volume of the video.
   * @returns - The volume of the video.
   */
  private getVolume() {
    return this.getProperty('volume');
  }

  /**
   * Clear progress interval and player on destroy.
   */
  ngOnDestroy(): void {
    clearInterval(this.progressIntervalId);
    this.player()?.dispose();
  }
}
