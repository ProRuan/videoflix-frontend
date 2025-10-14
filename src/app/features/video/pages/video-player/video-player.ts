import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { VideoSettingsDialog } from '@features/video/components';
import { VIDEO_PLAYER_OPTIONS } from '@features/video/constants';
import { PlayerSource } from '@features/video/interfaces';
import { PlayableVideo } from '@features/video/models';
import {
  FullscreenController,
  QualityLevelController,
  VideoDialogConfigurator,
  VideoPlayerFacade,
} from '@features/video/services';
import { OverlayManagerBase } from '@shared/services';

import { VideoPlayerHeader, VideoPlayerMultiBar } from './components';

/**
 * Class representing a video player component.
 *
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-video-player',
  imports: [VideoPlayerHeader, VideoPlayerMultiBar, VideoSettingsDialog],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  host: {
    '(document:mousemove)': 'onPlayerInteraction()',
    '(document:fullscreenchange)': 'onPlayerUIUpdate()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayer implements AfterViewInit {
  private route = inject(ActivatedRoute);
  private facade = inject(VideoPlayerFacade);
  private qlContr = inject(QualityLevelController);
  private fsContr = inject(FullscreenController);
  private config = inject(VideoDialogConfigurator);
  private dialogs = inject(OverlayManagerBase);

  private data = toSignal(this.route.data);
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

  isFullscreen = computed(() => this.fsContr.isFullscreen());

  readonly playbackRateConfig = this.config.playbackRateDialogConfig;
  readonly qualityLevelConfig = this.config.qualityLevelsDialogConfig;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLDivElement>;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  /**
   * Show player UI on mouse move.
   */
  onPlayerInteraction() {
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
