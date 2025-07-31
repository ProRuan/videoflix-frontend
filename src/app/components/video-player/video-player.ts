import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { VideoPlayerBase } from '../../shared/models/video-player-base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:mouseup)': 'stopDrag()',
  },
})
export class VideoPlayer extends VideoPlayerBase {
  private router: Router = inject(Router);

  playerHeaderHidden = signal(false);
  playerBarHidden = signal(false);
  hiddenTimeoutId!: ReturnType<typeof setTimeout>;
  lastTimeLock: number = Date.now();

  // fix progress bar height, transition and colors ...
  // fix bar box-shadows ...
  // fix full screen (theater mode) ...

  // fix loading behavior ...

  player!: Player;
  options = {
    controls: false,
    autoplay: false,
    preload: 'auto',
    techOrder: ['html5'],
    sources: [
      {
        src: 'out.m3u8',
        type: 'application/x-mpegURL',
      },
    ],
  };

  playing: boolean = false;
  volume: number = 0.5;
  draggingCurrentTime: boolean = false;
  dragging = false;
  wasPlayingBeforeDrag: boolean = false;
  playbackrate: number = 1;
  fullScreenEnabled: boolean = false;
  isFullscreen = signal(false);

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLDivElement>;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('volumeBar') volumeBar!: ElementRef<HTMLDivElement>;

  onMouseMove(event: MouseEvent) {
    if (this.draggingCurrentTime) this.updateCurrentTime(event);
    if (this.dragging) this.updateVolume(event);

    // activate
    // --------
    // if (this.lastTimeLock < Date.now()) {
    //   console.log('mouse move');
    //   this.lastTimeLock = Date.now() + 100;

    //   if (this.playerHeaderHidden()) {
    //     clearTimeout(this.hiddenTimeoutId);
    //     this.playerHeaderHidden.set(false);
    //     this.playerBarHidden.set(false);
    //     this.hiddenTimeoutId = setTimeout(() => {
    //       this.playerHeaderHidden.set(true);
    //       this.playerBarHidden.set(true);
    //     }, 3000);
    //   }
    // }
  }

  onBack() {
    this.router.navigateByUrl('video-offer');
  }

  stopDrag() {
    this.draggingCurrentTime = false;
    if (this.wasPlayingBeforeDrag) {
      this.video.nativeElement.play();
    }
    this.dragging = false;
    this.wasPlayingBeforeDrag = false;
  }

  ngAfterViewInit() {
    this.player = videojs(this.video.nativeElement, this.options);
    this.player.ready(() => {
      console.log('player ready');
    });
    this.player.on('loadedmetadata', () => {
      const duration = this.player.duration();
      if (duration) {
        this.duration.set(duration);
      }
      this.setCurrentBufferInterval();
    });
  }

  onEventStop(event: Event) {
    event.stopPropagation();
  }

  onCurrentTimeSet(event: MouseEvent) {
    this.updateCurrentTime(event);
  }

  // replace duration=40 with variable!!!
  updateCurrentTime(event: MouseEvent) {
    const bar = this.progressBar.nativeElement;
    const rect = bar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    this.currentTime.set(Math.max(0, Math.min(40, (x / rect.width) * 40)));
    console.log('currentTime: ', this.currentTime);

    // Sync with actual video element
    const videoElement = this.video.nativeElement;
    if (videoElement) videoElement.currentTime = this.currentTime();
  }

  onDragStartCurrentTime(event: MouseEvent) {
    event.preventDefault();
    this.draggingCurrentTime = true;
    const videoElement = this.video.nativeElement;
    this.wasPlayingBeforeDrag = !videoElement.paused;
    videoElement.pause();
    this.updateCurrentTime(event);
  }

  onDragPreventCurrentTime(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * Toggle between play and pause after a delay on click.
   */
  onPlayToggleLate() {
    this.togglePlayLate();
  }

  /**
   * Toggle between play and pause on click.
   */
  onPlayToggle() {
    this.clearClickTimeout();
    this.togglePlay();
  }

  onBackwardSkip() {
    this.skipBackward();
  }

  onForwardSkip() {
    this.skipForward();
  }

  onMuteToggle() {
    this.toggleMute();
  }

  onVolumeSet(event: MouseEvent) {
    this.updateVolume(event);
  }

  updateVolume(event: MouseEvent) {
    const bar = this.volumeBar.nativeElement;
    const rect = bar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    this.volume = percentage;

    this.setVolume(this.volume);
  }

  onDragStart(event: MouseEvent) {
    event.preventDefault();
    this.dragging = true;
    this.updateVolume(event);
  }

  onDragPrevent(event: DragEvent) {
    event.preventDefault();
  }

  onSpeedSelect(value: number) {
    this.playbackrate = value;
    this.setPlaybackRate(value);
  }

  isSpeed(value: number) {
    return value === this.playbackrate;
  }

  // onFullscreen() for button and onFullscreenDelayed() for video-container!!
  onFullScreen() {
    clearTimeout(this.clickTimeout);
    // this.clickTimeout = null;

    // const fullScreenEnabled = this.player.isFullscreen();
    // if (fullScreenEnabled) {
    //   this.player.exitFullscreen();
    // } else {
    //   this.player.requestFullscreen();
    // }

    const videoPlayerElement = this.videoPlayer.nativeElement;
    if (!document.fullscreenElement) {
      videoPlayerElement?.requestFullscreen?.();
      this.isFullscreen.set(true);
    } else {
      document.exitFullscreen?.();
      this.isFullscreen.set(false);
    }
  }
}
