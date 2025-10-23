import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { AuthResponse } from '@core/auth/interfaces';
import { UserClient } from '@core/auth/services';
import {
  PlayButton,
  SkipBackwardsButton,
  SkipForwardButton,
  VideoSettingsDialog,
} from '@features/video/components';
import { VIDEO_PLAYER_OPTIONS } from '@features/video/constants';
import { PlayerSource } from '@features/video/interfaces';
import { PlayableVideo } from '@features/video/models';
import {
  FullscreenController,
  QualityLevelController,
  VideoDialogConfigurator,
  VideoPlayerFacade,
} from '@features/video/services';
import { DialogManager, WindowResizer } from '@shared/services';

import { VideoPlayerHeader, VideoPlayerMultiBar } from './components';

/**
 * Class representing a video player component.
 * @implements {AfterViewInit}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-video-player',
  imports: [
    PlayButton,
    SkipBackwardsButton,
    SkipForwardButton,
    VideoPlayerHeader,
    VideoPlayerMultiBar,
    VideoSettingsDialog,
  ],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  host: {
    '(document:mousemove)': 'onPlayerInteraction($event)',
    '(document:pointerdown)': 'onPlayerInteraction($event)',
    '(document:fullscreenchange)': 'onPlayerUIUpdate()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayer implements AfterViewInit, OnInit {
  private route = inject(ActivatedRoute);
  private user = inject(UserClient);
  private facade = inject(VideoPlayerFacade);
  private qlContr = inject(QualityLevelController);
  private fsContr = inject(FullscreenController);
  private config = inject(VideoDialogConfigurator);
  private dialogs = inject(DialogManager);
  private resizer = inject(WindowResizer);

  // keep header in portrait mode or not ...
  // header: @if, displayed, hidding ...

  // rename fsContr to screenModes ...
  // rename qlContr to videoQualities ...

  // play button
  // -----------
  // move play-button hidePlayerUI() ... ?!
  // cache playing/paused state before toggle ...

  // play progress bar
  // -----------------
  // improve onScrubStart() ...
  //   --> improve pausePlayer() ...
  // improve onScrubEnd() ...

  // hide play button skip buttons during sliding ... ?
  // no player UI timeout for mobile ... ?

  private data = toSignal(this.route.data);
  private response = computed(() => this.data()?.['response'] as AuthResponse);
  private playableVideo = computed(
    () => this.data()?.['playableVideo'] as PlayableVideo
  );

  private title = computed(() => this.playableVideo()?.title);
  private masterUrl = computed(() => this.playableVideo()?.hlsPlaylist);
  private qualityLevelUrls = computed(() =>
    this.playableVideo()?.qualityLevels.map((l) => l.source)
  );

  private options = computed(() => this.getOptions());
  private sources = computed(() => this.getSources());

  hasPlayerUI = computed(() => this.fsContr.hasPlayerUI());
  isFullscreen = computed(
    () => this.fsContr.isFullscreen() || this.resizer.isFullscreen()
  );
  isMobileScreen = computed(() => this.resizer.isFullscreen());
  isIdle = computed(() => this.fsContr.isIdle());
  isDisplayed = computed(() => !this.fsContr.isIdle());

  readonly playbackRateConfig = this.config.playbackRateDialogConfig;
  readonly qualityLevelConfig = this.config.qualityLevelsDialogConfig;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLDivElement>;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  /**
   * Initialize a video player component.
   */
  ngOnInit() {
    this.setUser();
  }

  /**
   * Set the current user.
   */
  private setUser() {
    this.user.set(this.response());
  }

  /**
   * Show player UI on mouse move.
   * @param event - The event.
   */
  onPlayerInteraction(event: Event) {
    const type = event.type;
    if (type === 'mousemove' && this.isMobileScreen()) return;
    this.fsContr.showPlayerUIWithTimeout();
  }

  /**
   * Update the player UI display state on fullscreen change.
   */
  onPlayerUIUpdate() {
    this.fsContr.updatePlayerUI();
  }

  /**
   * Get video player options.
   * @returns The video player options.
   */
  private getOptions() {
    const options = VIDEO_PLAYER_OPTIONS;
    const source = this.getPlayerSource(this.masterUrl());
    options.sources = [source];
    return options;
  }

  /**
   * Get a player source.
   * @param url - The video URL.
   * @returns The player source.
   */
  private getPlayerSource(url: string): PlayerSource {
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
    return urls.map((u) => this.getPlayerSource(u));
  }

  /**
   * Set up a video player.
   */
  ngAfterViewInit() {
    this.setPlayer();
    this.setPlayerEvents();
  }

  /**
   * Set the video player.
   */
  setPlayer() {
    this.facade.setPlayerBox(this.videoPlayer.nativeElement);
    this.facade.setPlayer(this.video.nativeElement, this.options());
    this.facade.setSources(this.sources());
    this.facade.setTitle(this.title());
    this.facade.showMessageWithTimeout();
  }

  /**
   * Set the video player events.
   */
  setPlayerEvents() {
    this.facade.listenToDurationChanges();
    this.qlContr.listenToQualityLevelChanges();
  }

  /**
   * Toggle between play and pause with a delay on click.
   */
  onPlayToggle() {
    if (this.isMobileScreen()) {
      this.fsContr.showPlayerUIWithTimeout();
      return;
    }
    this.facade.togglePlayWithDelay();
  }

  /**
   * Toggle a video´s fullscreen mode on click.
   */
  onFullScreen() {
    this.fsContr.toggleFullscreen();
  }

  /**
   * Check if the playback rate dialog is open.
   * @returns True if the playback rate dialog is open, otherwise false.
   */
  isPlaybackRateDialogOpen() {
    return this.dialogs.isOpen('playback-rate-dialog');
  }

  /**
   * Check if the quality levels dialog is open.
   * @returns True if the quality levels dialog is open, otherwise false.
   */
  isQualityLevelsDialogOpen() {
    return this.dialogs.isOpen('quality-levels-dialog');
  }
}
