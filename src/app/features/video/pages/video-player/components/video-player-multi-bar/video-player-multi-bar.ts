import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FullscreenButton } from '@features/video/components/buttons/fullscreen-button/fullscreen-button';
import { PlayButton } from '@features/video/components/buttons/play-button/play-button';
import { QualityButton } from '@features/video/components/buttons/quality-button/quality-button';
import { SkipBackwardsButton } from '@features/video/components/buttons/skip-backwards-button/skip-backwards-button';
import { SkipForwardButton } from '@features/video/components/buttons/skip-forward-button/skip-forward-button';
import { PlayProgressBar } from '@features/video/components';
import { VideoPlayerFacade } from '@features/video/services';
import { VolumeControl } from '@features/video/components/controls/volume-control/volume-control';
import { PlaybackRateButton } from '@features/video/components/buttons/playback-rate-button/playback-rate-button';

@Component({
  selector: 'app-video-player-multi-bar',
  imports: [
    FullscreenButton,
    PlaybackRateButton,
    PlayButton,
    PlayProgressBar,
    QualityButton,
    SkipBackwardsButton,
    SkipForwardButton,
    VolumeControl,
  ],
  templateUrl: './video-player-multi-bar.html',
  styleUrl: './video-player-multi-bar.scss',
})
export class VideoPlayerMultiBar {
  private facade = inject(VideoPlayerFacade);

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

  // update current time during dragging ... ?!
  draggingCurrentTime = signal(false);
  wasPlayingBeforeDrag = signal(false);

  title = computed(() => this.facade.title());

  currentDisplayTime = computed(() => this.facade.currentDisplayTime());
  remainingDisplayTime = computed(() => this.facade.remainingDisplayTime());
  currentTime = computed(() => this.facade.currentTime());
  bufferPercent = computed(() => this.facade.bufferPercent());

  // replace getters ...
  constructor() {}

  onEventStop(event: Event) {
    event.stopPropagation();
  }

  // rename functions ...
  onTimeSelect(event: MouseEvent) {
    this.updateCurrentTime(event);
  }

  // replace duration=40 with variable!!!
  updateCurrentTime(event: MouseEvent) {
    const bar = this.progressBar.nativeElement;
    const rect = bar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    this.facade.setCurrentTime(
      Math.max(0, Math.min(40, (x / rect.width) * 40))
    );
    console.log('currentTime: ', this.currentTime);

    // Sync with actual video element
    // const videoElement = this.video.nativeElement;
    // if (videoElement) videoElement.currentTime = this.currentTime();
  }

  // update play progress bar style ...
  onTimeDragStart(event: MouseEvent) {
    event.preventDefault();
    this.draggingCurrentTime.set(true);

    this.wasPlayingBeforeDrag.set(!this.facade.isPaused());
    this.facade.pause();

    this.updateCurrentTime(event);
  }

  onDragStop(event: Event) {
    event.preventDefault();
  }
}
