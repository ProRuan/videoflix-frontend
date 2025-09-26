import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import { PlayableVideo, VideoPlayerBase } from '@features/video/models';
import { VideoStore } from '@features/video/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStore, UserClient } from '@core/auth/services';

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
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private auth = inject(AuthStore);
  private user: UserClient = inject(UserClient);
  private vs: VideoStore = inject(VideoStore);

  // I. Video quality / resolutions ...
  // II. Video progress ...

  // update resolution message ...

  // rename activatedRoute to route
  data = toSignal(this.activatedRoute.data);
  playableVideo = computed(
    () => this.data()?.['playableVideo'] as PlayableVideo
  );

  playerHeaderHidden = signal(false);
  playerBarHidden = signal(false);
  hiddenTimeoutId!: ReturnType<typeof setTimeout>;
  lastTimeLock: number = Date.now();

  // add video quality options ...
  // add video progress logic ...

  // fix progress bar height, transition and colors ...
  // fix bar box-shadows ...
  // fix full screen (theater mode) ...

  // fix loading behavior ...

  // finalize video-player design ...
  // clean code ...

  player!: Player;
  sources = {
    auto: {
      src: this.playableVideo().hlsPlaylist,
      type: 'application/x-mpegURL',
    },
    '1080p': {
      src: this.playableVideo().availableResolutions['1080p'],
      type: 'application/x-mpegURL',
    },
    '720p': {
      src: this.playableVideo().availableResolutions['720p'],
      type: 'application/x-mpegURL',
    },
    '360p': {
      src: this.playableVideo().availableResolutions['360p'],
      type: 'application/x-mpegURL',
    },
    '120p': {
      src: this.playableVideo().availableResolutions['120p'],
      type: 'application/x-mpegURL',
    },
  };

  // use only one master playlist ...
  options = {
    controls: false,
    autoplay: false,
    preload: 'auto',
    techOrder: ['html5'],
    sources: [
      {
        src: this.playableVideo().hlsPlaylist,
        type: 'application/x-mpegURL',
      },
      // {
      //   src: this.playableVideo().availableResolutions['1080p'],
      //   type: 'application/x-mpegURL',
      // },
      // {
      //   src: this.playableVideo().availableResolutions['720p'],
      //   type: 'application/x-mpegURL',
      // },
      // {
      //   src: this.playableVideo().availableResolutions['360p'],
      //   type: 'application/x-mpegURL',
      // },
      // {
      //   src: this.playableVideo().availableResolutions['120p'],
      //   type: 'application/x-mpegURL',
      // },
    ],
  };

  qualityMessage = signal('');

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
    const token = this.auth.getToken();
    this.router.navigateByUrl(`/video/offer/${token}`);
    // this.router.navigateByUrl('video-offer');
  }

  stopDrag() {
    this.draggingCurrentTime = false;
    if (this.wasPlayingBeforeDrag) {
      this.video.nativeElement.play();
    }
    this.dragging = false;
    this.wasPlayingBeforeDrag = false;
  }

  // remove
  ngOnInit() {
    console.log('playable video data: ', this.playableVideo());
    console.log('options: ', this.options);
  }

  ngAfterViewInit() {
    this.player = videojs(this.video.nativeElement, this.options);
    this.player.ready(() => {
      console.log('player ready');
      console.log('player src: ', this.player.currentSource());
    });
    this.player.on('loadedmetadata', () => {
      const duration = this.player.duration();
      if (duration) {
        this.duration.set(duration);
      }
      this.setCurrentBufferInterval();
    });

    // setTimeout(() => {
    //   console.log('player src: ', this.player.currentSource());
    //   this.player.src({
    //     src: this.playableVideo?.availableResolutions?.['720p'],
    //     type: 'application/x-mpegURL',
    //   });
    //   console.log('player src: ', this.player.currentSource());
    // }, 1000);
  }

  updateSource(key: 'auto' | '1080p' | '720p' | '360p' | '120p') {
    this.player.pause();
    const currentTime = this.player.currentTime();
    this.player.src(this.sources[key]);

    this.setQualityMessage(key);

    this.player.ready(() => {
      this.player.currentTime(currentTime);
      this.player.play();
      console.log('source: ', this.player.currentSource());
    });
  }

  setQualityMessage(height: string) {
    if (height.includes('p')) {
      const h = height.match(/\d{1,}/)?.[0] ?? '0';
      console.log('height: ', h);
      const bodyHeight = document.body.clientHeight;
      const value = Math.round((Number(h) / bodyHeight) * 100);
      const message = `Optimizing video for your screen ${value}%`;
      this.qualityMessage.set(message);
      console.log('message: ', message);
    }
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
