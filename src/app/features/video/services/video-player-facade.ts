import { computed, ElementRef, Injectable, signal } from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { getHours, getMinutes, getSeconds } from '../utils/time-utils';

@Injectable({
  providedIn: 'root',
})
export class VideoPlayerFacade {
  playerContainer = signal<ElementRef<HTMLDivElement> | null>(null);
  player = signal<Player | null>(null);

  // replace any ...

  // no interval needed ... ?!
  // options: getter, signal, set value, markForCheck ...
  //   --> first getter, second signal/computed ...

  // work with quality levels (for auto rendering) ...

  private readonly stepSize: number = 10;

  sources = signal<any[]>([]);

  currentDisplayTime = signal('');
  remainingDisplayTime = signal('');
  currentTime = signal(0);
  bufferPercent = signal(0);
  duration = signal(0);
  hasDuration = computed(() => this.duration() > 0);

  cachedVolume: number = 0.5;
  currentPlaybackRate = signal(1);

  isPlaying = signal(false);
  playTimeoutId: ReturnType<typeof setTimeout> = -1;

  isFullscreen = signal(false);

  // use isPlayerReady to display interface when player is ready .. ?
  // isPlayerReady = signal(false);

  // 60 fps ... ?!
  constructor() {
    setInterval(() => {
      this.currentDisplayTime.update(() => this.getCurrentDisplayTime());
      this.remainingDisplayTime.update(() => this.getRemainingDisplayTime());
      this.currentTime.update(() => this.getCurrentTime());
      this.bufferPercent.update(() => this.getBufferedPercent() * 100);
    }, 1000 / 60);
  }

  setPlayerContainer(element: ElementRef<HTMLDivElement>) {
    this.playerContainer.set(element);
  }

  getCurrentDisplayTime() {
    const currentTime = Math.round(this.getCurrentTime());
    const hours = getHours(currentTime);
    const minutes = getMinutes(currentTime);
    const seconds = getSeconds(currentTime);
    const times = [hours, minutes, seconds].filter((t) => t !== null);
    return times.join(':');
  }

  // double code
  getRemainingDisplayTime() {
    const remainingTime = Math.round(this.player()?.remainingTime() ?? 0);
    if (isNaN(remainingTime)) return '0:00';
    const hours = getHours(remainingTime);
    const minutes = getMinutes(remainingTime);
    const seconds = getSeconds(remainingTime);
    const times = [hours, minutes, seconds].filter((t) => t !== null);
    return times.join(':');
  }

  getPlayer() {
    return this.player();
  }

  setPlayer(player: ElementRef<HTMLVideoElement>, options: any) {
    this.player.set(videojs(player.nativeElement, options));
    this.setVolume(0.5);
  }

  // video element
  togglePlayWithDelay() {
    if (this.isPlayTimeout()) return;
    // necessary ... ?
    this.clearPlayTimeout();
    this.playTimeoutId = setTimeout(() => {
      this.togglePlay();
    }, 250);
  }

  isPlayTimeout() {
    return this.playTimeoutId > -1;
  }

  clearPlayTimeout() {
    clearTimeout(this.playTimeoutId);
    this.playTimeoutId = -1;
  }

  // play progress bar
  getDuration() {
    return this.player()?.duration() ?? 0;
  }

  getRemainingTime() {
    return this.player()?.remainingTime() ?? 0;
  }

  setCurrentTime(value: number) {
    this.player()?.currentTime(value);
  }

  getBufferedPercent() {
    return this.player()?.bufferedPercent() ?? 0;
  }

  getPlayedPercent() {
    return (this.currentTime() / this.duration()) * 100;
  }

  // play button
  togglePlay() {
    this.clearPlayTimeout();
    this.isPaused() ? this.play() : this.pause();
  }

  play() {
    this.player()?.play();
    this.isPlaying.set(true);
  }

  pause() {
    this.player()?.pause();
    this.isPlaying.set(false);
  }

  isPaused() {
    return this.player()?.paused() ?? false;
  }

  hasStarted() {
    return this.player()?.hasStarted_;
  }

  hasEnded() {
    return this.player()?.ended() ?? false;
  }

  // volume button
  // improve
  toggleMute() {
    if (this.isMuted()) {
      this.setMute(false);
      this.setVolume(this.cachedVolume);
    } else {
      this.setMute(true);
      this.cachedVolume = this.getVolume();
      this.setVolume(0);
    }
  }

  isMuted() {
    return this.player()?.muted();
  }

  setMute(value: boolean) {
    this.player()?.muted(value);
  }

  setVolume(value: number) {
    return this.player()?.volume(value);
  }

  // backward-10 button
  skipBackwards() {
    const currentTime = this.getCurrentTime();
    const newTime = currentTime - this.stepSize;
    this.player()?.currentTime(newTime);
  }

  getCurrentTime() {
    return this.player()?.currentTime() ?? 0;
  }

  // forward-10 button
  skipForward() {
    const currentTime = this.getCurrentTime();
    const newTime = currentTime + this.stepSize;
    this.player()?.currentTime(newTime);
  }

  getVolume() {
    return this.player()?.volume() ?? 0;
  }

  // speed button
  setPlaybackRate(value: number) {
    this.currentPlaybackRate.set(value);
    this.player()?.playbackRate(value);
  }

  // quality button
  // replace any ... !
  setSources(sources: any[]) {
    this.sources.set(sources);
  }

  // update quality level message ...
  setQualityLevel(value: number) {
    console.log('this sources: ', this.sources());
    this.pause();
    const currentTime = this.getCurrentTime();
    const index = value ?? 0;
    this.player()?.updateSourceCaches_(this.sources()[index]);
    this.player()?.load();
    this.player()?.ready(() => {
      this.setCurrentTime(currentTime);
      this.play();
    });
  }

  // for video element or video container element ... ?!
  // fullscreen button
  toggleFullscreen() {
    this.clearPlayTimeout();
    const playerContainer = this.playerContainer()?.nativeElement;
    if (this.isFullscreen()) {
      this.exitFullscreen(playerContainer);
    } else {
      this.enterFullscreen(playerContainer);
    }
  }

  exitFullscreen(element?: HTMLDivElement) {
    // this.isFullscreen.set(false);
    document.exitFullscreen();
  }

  enterFullscreen(element?: HTMLDivElement) {
    element?.requestFullscreen();
    // this.isFullscreen.set(true);
  }

  // // for video element or video container element ... ?!
  // // fullscreen button
  // toggleFullscreen() {
  //   if (this.isFullscreen()) {
  //     this.player()?.exitFullscreen();
  //     // this.player()?.isFullscreen(false);
  //   } else {
  //     this.player()?.requestFullscreen();
  //     // this.player()?.isFullscreen(true);
  //   }
  // }

  // isFullscreen() {
  //   return this.player()?.isFullscreen();
  // }
}
