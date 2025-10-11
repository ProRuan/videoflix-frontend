import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { VideoSettingsDialog } from '@features/video/components';
import { VIDEO_PLAYER_OPTIONS } from '@features/video/constants';
import { PlayableVideo } from '@features/video/models';
import {
  FullscreenController,
  QualityLevelController,
  VideoDialogConfigurator,
  VideoPlayerFacade,
} from '@features/video/services';
import { OverlayManagerBase } from '@shared/services';

import { VideoPlayerHeader, VideoPlayerMultiBar } from './components';

import QualityLevelList from 'videojs-contrib-quality-levels/dist/types/quality-level-list';
import { map } from 'rxjs';
import { SourceObject } from '@features/video/interfaces';
import { TimeoutId } from '@shared/constants';

/**
 * Class representing a video player component.
 */
@Component({
  selector: 'app-video-player',
  imports: [VideoPlayerHeader, VideoPlayerMultiBar, VideoSettingsDialog],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  host: {
    '(document:mousemove)': 'onMouseMove($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayer {
  private route = inject(ActivatedRoute);

  // testing
  private facade = inject(VideoPlayerFacade);
  private qlContr = inject(QualityLevelController);
  private fsContr = inject(FullscreenController);
  private dialogs = inject(OverlayManagerBase);
  private config = inject(VideoDialogConfigurator);

  // rename SourceObject to PlayerSource ...
  // rename VideoPlayerOptions to PlayerOptions ...

  // improve header quality message ...
  //   --> update also on fullscreen change or (quality level) change ...

  // wasPlayingBeforePause ...
  //   --> update quality level controller ...

  // reset facade on destroy ... !

  // improve (using one liners) ...
  private readonly data = toSignal(this.route.data);
  private playableVideo = computed(
    () => this.data()?.['playableVideo'] as PlayableVideo
  );
  private masterUrl = computed(() => this.playableVideo()?.hlsPlaylist);
  private qualityLevelUrls = computed(() =>
    this.playableVideo()?.qualityLevels.map((l) => l.source)
  );
  private title = computed(() => this.playableVideo()?.title);

  private options = computed(() => this.getOptions());
  private sources = computed(() => this.getSources());

  readonly playbackRateConfig = this.config.playbackRateDialogConfig;
  readonly qualityLevelConfig = this.config.qualityLevelsDialogConfig;

  fullScreenEnabled: boolean = false;
  isFullscreen = signal(false);

  lastMouseMove: number = 0;
  controlTimeout: TimeoutId = -1;
  hasControls = signal(false);

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLDivElement>;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  onMouseMove(event: MouseEvent) {
    const time = Date.now();
    if (time - this.lastMouseMove < 100) return;
    clearTimeout(this.controlTimeout);
    this.lastMouseMove = time;
    this.hasControls.set(true);
    this.controlTimeout = setTimeout(() => {
      this.hasControls.set(false);
    }, 2000);
  }

  ngAfterViewInit() {
    this.setPlayer();
    this.setPlayerEvents();

    const player = this.qlContr.player() as any;
    const qualityLevels = player.qualityLevels() as QualityLevelList;

    qualityLevels.on('change', (event: Event) => {
      console.log('change: ', event);
      this.qlContr.setQualityLevels();
      console.log('quality levels signal: ', this.qlContr.qualityLevels());

      if (this.qlContr.hasMasterSource()) {
        const qualityLevelEvent = event as any;
        const selectedIndex = qualityLevelEvent.selectedIndex;
        console.log('selected index: ', selectedIndex);

        const level = this.qlContr.qualityLevels()[selectedIndex];
        console.log('master level: ', level);

        const height = document.body.clientHeight;
        const percent = Math.round((level.height / height) * 100);
        console.log('percent: ', percent);
        this.qlContr.optimizingPercent.set(percent);
      }
    });
  }

  /**
   * Set the video player.
   */
  setPlayer() {
    this.facade.setPlayerBox(this.videoPlayer.nativeElement);
    this.facade.setPlayer(this.video.nativeElement, this.options());
    this.facade.setSources(this.sources());
    this.facade.setTitle(this.title());
  }

  /**
   * Get video player options.
   * @returns The video player options.
   */
  private getOptions() {
    const options = VIDEO_PLAYER_OPTIONS;
    const source = this.getSourceObject(this.masterUrl());
    options.sources = [source];
    return options;
  }

  /**
   * Get a player source object.
   * @param url - The video URL.
   * @returns The player source object.
   */
  private getSourceObject(url: string): SourceObject {
    return {
      src: url,
      type: 'application/x-mpegURL',
    };
  }

  /**
   * Get player sources.
   * @returns The player sources.
   */
  private getSources() {
    const urls = [this.masterUrl(), ...this.qualityLevelUrls()];
    return urls.map((u) => this.getSourceObject(u));
  }

  /**
   * Set the video player events.
   */
  setPlayerEvents() {
    this.facade.listenToDurationChange();
  }

  // rename ...
  onPlayToggleLate() {
    this.facade.togglePlayWithDelay();
    // this.togglePlayLate();
  }

  // rename method and dialog id ... ?
  isPlaybackRateMenu() {
    return this.dialogs.isOpen('playback-rate-dialog');
  }

  // rename method ... ?
  isQualityMenu() {
    return this.dialogs.isOpen('quality-levels-dialog');
  }

  // onFullscreen() for button and onFullscreenDelayed() for video-container!!
  onFullScreen() {
    this.fsContr.toggleFullscreen();
  }

  isFullscreenNew() {
    return this.fsContr.isFullscreen();
  }

  isUIDisabled() {
    return this.isFullscreenNew() && !this.hasControls();
  }

  onFullscreenChange(event: Event) {
    console.log('fullscreen change: ', event);
    this.fsContr.isFullscreen.update((value) => !value);

    if (this.isFullscreenNew()) {
      clearTimeout(this.controlTimeout);
      this.hasControls.set(true);
      this.controlTimeout = setTimeout(() => {
        this.hasControls.set(false);
      }, 3000);
    }
  }
}
