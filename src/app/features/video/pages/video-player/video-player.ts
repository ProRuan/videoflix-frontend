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
import { VideoSettingsDialog } from '@features/video/components';
import {
  VIDEO_PLAYER_OPTIONS,
  VideoDialogIds,
} from '@features/video/constants';
import { PlayerSource } from '@features/video/interfaces';
import { PlayableVideo } from '@features/video/models';
import {
  FullscreenController,
  QualityLevelController,
  VideoPlayerFacade,
} from '@features/video/services';
import { DialogManager, WindowResizer } from '@shared/services';

import {
  VideoPlayerHeader,
  VideoPlayerMultiBar,
  VideoPlayerTouchControl,
} from './components';

/**
 * Class representing a video player component.
 * @implements {AfterViewInit}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-video-player',
  imports: [
    VideoPlayerHeader,
    VideoPlayerMultiBar,
    VideoPlayerTouchControl,
    VideoSettingsDialog,
  ],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  host: {
    '(document:mousemove)': 'onPlayerInteraction($event)',
    '(document:pointerup)': 'onPlayerInteraction($event)',
    '(document:fullscreenchange)': 'onPlayerUIUpdate()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayer implements AfterViewInit, OnInit {
  private route = inject(ActivatedRoute);
  private user = inject(UserClient);
  private facade = inject(VideoPlayerFacade);
  private videoQualities = inject(QualityLevelController);
  private screenModes = inject(FullscreenController);
  private dialogs = inject(DialogManager);
  private resizer = inject(WindowResizer);

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

  isMobileScreen = computed(() => this.resizer.isFullscreen());
  isImmersive = computed(() => this.screenModes.isImmersive());
  isStandard = computed(() => this.screenModes.isStandard());
  isActive = computed(() => this.screenModes.isActive());

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
    return { src: url, type: 'application/x-mpegURL' };
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
    this.videoQualities.showMessageWithTimeout();
  }

  /**
   * Set the video player events.
   */
  setPlayerEvents() {
    this.facade.listenToDurationChanges();
    this.videoQualities.listenToQualityLevelChanges();
  }

  /**
   * Toggle between play and pause with a delay on click.
   */
  onPlayToggle() {
    if (this.isMobileScreen()) return;
    this.facade.togglePlayWithDelay();
  }

  /**
   * Toggle a video´s fullscreen mode on click.
   */
  onFullScreen() {
    if (this.isMobileScreen()) return;
    this.screenModes.toggleFullscreen();
  }

  /**
   * Check if a video settings dialog is open.
   * @returns True if a video settings dialog is open, otherwise false.
   */
  isDialogOpen() {
    for (const [key, value] of Object.entries(VideoDialogIds)) {
      if (this.dialogs.isOpen(value)) return true;
    }
    return false;
  }

  /**
   * Show player UI on mouse move.
   * @param event - The event.
   */
  onPlayerInteraction(event: Event) {
    if (this.isStandard()) return;
    if (this.isMouseOut(event.type)) return;
    this.screenModes.showPlayerUIWithTimeout();
  }

  /**
   * Check if the mouse event is out.
   * @param type - The event type.
   * @returns True if the event type is 'mousemove' and the window width
   *          is 1280px or less, otherwise false.
   */
  private isMouseOut(type: string) {
    return type === 'mousemove' && this.isMobileScreen();
  }

  /**
   * Update the player UI display state on fullscreen change.
   */
  onPlayerUIUpdate() {
    this.screenModes.updatePlayerUI();
  }
}
