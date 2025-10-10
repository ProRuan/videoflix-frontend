import { computed, ElementRef, Injectable, signal } from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { getHours, getMinutes, getSeconds } from '../utils/time-utils';
import { TimeoutId } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class VideoPlayerFacade {
  playerContainer = signal<ElementRef<HTMLDivElement> | null>(null);
  player = signal<Player | null>(null);

  // replace any ...
  // set private keyword ...

  // no interval needed ... ?!
  // options: getter, signal, set value, markForCheck ...
  //   --> first getter, second signal/computed ...

  // work with quality levels (for auto rendering) ...

  // think about private properties and methods (0/2) ...

  // reset facade on destory ... !

  // improve and/or rename playerContainer ...
  // dispose player on destroy ... !

  private readonly stepSize: number = 10;

  title = signal('');

  isPlaying = signal(false);

  currentDisplayTime = signal('');
  remainingDisplayTime = signal('');
  duration = signal(0);
  buffered = signal(0);
  currentTime = signal(0);
  hasEnded = signal(false);

  bufferPercent = computed(() => this.getBufferedPercent());
  playedPercent = computed(() => this.getPlayedPercent());

  playTimeoutId: TimeoutId = -1;

  // in progress
  cachedVolume = signal(0.5);
  volume = signal(0.5);
  volumePercent = computed(() => this.volume() * 100);
  isMute = computed(() => this.volume() === 0);

  // to edit
  sources = signal<any[]>([]);
  wasPlayingBeforePause = signal(false);

  isFullscreen = signal(false);

  // use isPlayerReady to display interface when player is ready .. ?
  // isPlayerReady = signal(false);

  // 60 fps ... ?!
  constructor() {
    setInterval(() => {
      this.currentDisplayTime.update(() => this.getCurrentDisplayTime());
      this.remainingDisplayTime.update(() => this.getRemainingDisplayTime());
      this.currentTime.update(() => this.getCurrentTime());
      this.buffered.update(() => this.getBufferEnd());

      this.hasEnded.update(() => this.player()?.ended() ?? false);
      if (this.hasEnded()) {
        this.isPlaying.set(false);
      }
    }, 1000 / 60);
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
   * @returns Void.
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
    return this.player()?.paused() ?? false;
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
    return this.player()?.currentTime() ?? 0;
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
    return this.player()?.remainingTime() ?? 0;
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
    return this.player()?.duration() ?? 0;
  }

  /**
   * Get the buffer end of a video.
   * @returns The buffer end of the video.
   */
  private getBufferEnd() {
    return this.player()?.bufferedEnd() ?? 0;
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
    return this.player()?.muted() ?? false;
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
    return this.player()?.volume() ?? 0;
  }

  // --- edit --- edit --- edit ---
  // ------------------------------

  // remove at the end ...
  getPlayer() {
    return this.player();
  }

  setPlayer(player: ElementRef<HTMLVideoElement>, options: any) {
    this.player.set(videojs(player.nativeElement, options));
    this.setVolume(0.5);
  }

  setPlayerContainer(element: ElementRef<HTMLDivElement>) {
    this.playerContainer.set(element);
  }

  // quality button
  // replace any ... !
  setSources(sources: any[]) {
    this.sources.set(sources);
  }
}
