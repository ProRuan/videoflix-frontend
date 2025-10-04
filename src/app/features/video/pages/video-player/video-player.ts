import {
  ChangeDetectionStrategy,
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
import { VideoPlayerFacade, VideoStore } from '@features/video/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStore, UserClient } from '@core/auth/services';
import { VideoPlayerHeader, VideoPlayerMultiBar } from './components';
import { PlayButton } from '@features/video/components/buttons/play-button/play-button';
import { VolumeButton } from '@features/video/components/buttons/volume-button/volume-button';
import { SkipBackwardsButton } from '@features/video/components/buttons/skip-backwards-button/skip-backwards-button';
import { SkipForwardButton } from '@features/video/components/buttons/skip-forward-button/skip-forward-button';
import { FullscreenButton } from '@features/video/components/buttons/fullscreen-button/fullscreen-button';
import { SpeedButton } from '@features/video/components/buttons/speed-button/speed-button';
import { QualityButton } from '@features/video/components/buttons/quality-button/quality-button';

@Component({
  selector: 'app-video-player',
  imports: [
    FullscreenButton,
    VideoPlayerHeader,
    PlayButton,
    QualityButton,
    SkipBackwardsButton,
    SkipForwardButton,
    SpeedButton,
    VolumeButton,
    VideoPlayerMultiBar,
  ],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:mouseup)': 'stopDrag()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayer extends VideoPlayerBase {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private auth = inject(AuthStore);
  private user: UserClient = inject(UserClient);
  private vs: VideoStore = inject(VideoStore);

  // testing
  private facade = inject(VideoPlayerFacade);

  // move ui elements to video player ui bar ...

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

  player = computed(() => this.facade.player());

  // update quality level sources ... !
  sources = {
    auto: {
      src: this.playableVideo().hlsPlaylist,
      type: 'application/x-mpegURL',
    },
    '1080p': {
      src: this.playableVideo().qualityLevels[0].source,
      type: 'application/x-mpegURL',
    },
    '720p': {
      src: this.playableVideo().qualityLevels[1].source,
      type: 'application/x-mpegURL',
    },
    '360p': {
      src: this.playableVideo().qualityLevels[2].source,
      type: 'application/x-mpegURL',
    },
    '144p': {
      src: this.playableVideo().qualityLevels[3].source,
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
      {
        src: this.playableVideo().qualityLevels[0].source,
        type: 'application/x-mpegURL',
      },
      {
        src: this.playableVideo().qualityLevels[1].source,
        type: 'application/x-mpegURL',
      },
      {
        src: this.playableVideo().qualityLevels[2].source,
        type: 'application/x-mpegURL',
      },
      {
        src: this.playableVideo().qualityLevels[3].source,
        type: 'application/x-mpegURL',
      },
    ],
    enableSmoothSeeking: true,
    enableDocumentPictureInPicture: true,
    // apply fullscreen options ... ?!
    sourceOrder: true,
  };

  qualityLevels = [
    this.playableVideo().hlsPlaylist,
    this.playableVideo().qualityLevels[0].source,
    this.playableVideo().qualityLevels[1].source,
    this.playableVideo().qualityLevels[2].source,
    this.playableVideo().qualityLevels[3].source,
  ];

  qualityMessage = signal('');

  playing: boolean = false;
  volume: number = 0.5;
  draggingCurrentTime: boolean = false;
  dragging = false;
  wasPlayingBeforeDrag: boolean = false;
  playbackrate: number = 1;
  fullScreenEnabled: boolean = false;
  isFullscreen = signal(false);

  lastMouseMove: number = 0;
  controlTimeout: ReturnType<typeof setTimeout> = -1;
  hasControls = signal(false);

  videoWidth = signal('100%');
  videoHeight = signal('auto');

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLDivElement>;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('volumeBar') volumeBar!: ElementRef<HTMLDivElement>;

  constructor() {
    // remove super later ...
    super();
    document.onkeydown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === 'Escape' && this.facade.isFullscreen()) {
        this.facade.exitFullscreen();
      }
    };
  }

  onMouseMove(event: MouseEvent) {
    if (this.draggingCurrentTime) this.updateCurrentTime(event);
    if (this.dragging) this.updateVolume(event);

    const time = Date.now();
    if (time - this.lastMouseMove < 100) return;
    clearTimeout(this.controlTimeout);
    this.lastMouseMove = time;
    this.hasControls.set(true);
    this.controlTimeout = setTimeout(() => {
      this.hasControls.set(false);
    }, 3000);

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
    this.facade.setPlayerContainer(this.videoPlayer);
    this.facade.setPlayer(this.video, this.options);
    this.facade.setSources(this.options.sources);
    this.player()?.ready(() => {
      console.log('player ready');
      console.log('player src: ', this.player()?.currentSource());
      console.log('select source: ', this.facade.getPlayer()?.currentSources());
    });
    this.player()?.on('loadedmetadata', () => {
      const duration = this.player()?.duration();
      if (duration) {
        this.duration.set(duration);
      }
      this.setCurrentBufferInterval();
    });

    // setTimeout(() => {
    //   console.log('player src: ', this.player()?.currentSource());
    //   this.player()?.src({
    //     src: this.playableVideo?.availableResolutions?.['720p'],
    //     type: 'application/x-mpegURL',
    //   });
    //   console.log('player src: ', this.player()?.currentSource());
    // }, 1000);
  }

  updateSource(key: 'auto' | '1080p' | '720p' | '360p' | '144p') {
    this.player()?.pause();
    const currentTime = this.player()?.currentTime();
    this.player()?.src(this.sources[key]);

    this.setQualityMessage(key);

    this.player()?.ready(() => {
      this.player()?.currentTime(currentTime);
      this.player()?.play();
      console.log('source: ', this.player()?.currentSource());
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

  // rename ...
  onPlayToggleLate() {
    this.facade.togglePlayWithDelay();
    // this.togglePlayLate();
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

    // const fullScreenEnabled = this.player()?.isFullscreen();
    // if (fullScreenEnabled) {
    //   this.player()?.exitFullscreen();
    // } else {
    //   this.player()?.requestFullscreen();
    // }

    this.facade.toggleFullscreen();

    // const videoPlayerElement = this.videoPlayer.nativeElement;
    // if (!document.fullscreenElement) {
    //   videoPlayerElement?.requestFullscreen?.();
    //   this.isFullscreen.set(true);
    // } else {
    //   document.exitFullscreen?.();
    //   this.isFullscreen.set(false);
    // }
  }

  isFullscreenNew() {
    return this.facade.isFullscreen();
  }

  isUIDisabled() {
    return this.isFullscreenNew() && !this.hasControls();
  }

  onFullscreenChange(event: Event) {
    this.facade.isFullscreen.update((value) => !value);
    if (this.isFullscreenNew()) {
      clearTimeout(this.controlTimeout);
      this.hasControls.set(true);
      this.controlTimeout = setTimeout(() => {
        this.hasControls.set(false);
      }, 3000);
    }
  }

  /**
   * 16 / 9 = 1.7777
   *
   * longer width: 20 / 9 = 2.2222
   * 1.7777 < 2.2222 --> favour height
   *
   * shorter width: 12 / 9 = 1.3333
   * 1.3333 < 1.7777 ---> favour width
   *
   * longer height: 16 / 12 = 1.3333
   * 1.3333 < 1.7777 --> favour width
   *
   * shorter height: 16 / 6 = 2.6666
   * 1.7777 < 2.6666 --> favour height
   */
}
