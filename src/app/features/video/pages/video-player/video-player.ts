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
import { PlayableVideo } from '@features/video/models';
import { VideoPlayerFacade, VideoStore } from '@features/video/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStore, UserClient } from '@core/auth/services';
import { VideoPlayerHeader, VideoPlayerMultiBar } from './components';

@Component({
  selector: 'app-video-player',
  imports: [VideoPlayerHeader, VideoPlayerMultiBar],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:mouseup)': 'stopDrag()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayer {
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
    document.onkeydown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === 'Escape' && this.facade.isFullscreen()) {
        this.facade.exitFullscreen();
      }
    };
  }

  onMouseMove(event: MouseEvent) {
    const time = Date.now();
    if (time - this.lastMouseMove < 100) return;
    clearTimeout(this.controlTimeout);
    this.lastMouseMove = time;
    this.hasControls.set(true);
    this.controlTimeout = setTimeout(() => {
      this.hasControls.set(false);
    }, 3000);
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

  onDragPreventCurrentTime(event: DragEvent) {
    event.preventDefault();
  }

  // rename ...
  onPlayToggleLate() {
    this.facade.togglePlayWithDelay();
    // this.togglePlayLate();
  }

  // onFullscreen() for button and onFullscreenDelayed() for video-container!!
  onFullScreen() {
    this.facade.toggleFullscreen();
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
}
