import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer {
  // remove test video from public folder ...
  // improve progress bar and currentTime ...
  //   --> save values in backend ... ?
  // play-button: play, pause, replay (icons + logic) ...
  // hide volume bar ...
  // hide speed values ...
  // fix full screen ...

  // click delay only on video-container (not on buttons) ...
  //   --> button must react without delay ... !

  currentTime: number = 0;
  playing: boolean = false;
  volume: number = 0.5;
  draggingCurrentTime: boolean = false;
  dragging = false;
  wasPlayingBeforeDrag: boolean = false;
  playbackrate: number = 1;
  fullScreenEnabled: boolean = false;
  clickTimeout: any = null;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLDivElement>;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('volumeBar') volumeBar!: ElementRef<HTMLDivElement>;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.draggingCurrentTime) this.updateCurrentTime(event);
    if (this.dragging) this.updateVolume(event);
  }

  @HostListener('document:mouseup')
  stopDrag() {
    this.draggingCurrentTime = false;
    if (this.wasPlayingBeforeDrag) {
      this.video.nativeElement.play();
    }
    this.dragging = false;
    this.wasPlayingBeforeDrag = false;
  }

  ngAfterViewInit() {
    console.log('video: ', this.video.nativeElement);
    console.log('video current time: ', this.video.nativeElement.currentTime);

    setTimeout(() => {
      console.log('video current time: ', this.video.nativeElement.currentTime);
    }, 3000);
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
    this.currentTime = Math.max(
      0,
      Math.min(40, Math.floor((x / rect.width) * 40))
    );
    console.log('currentTime: ', this.currentTime);

    // Sync with actual video element
    const videoElement = this.video.nativeElement;
    if (videoElement) videoElement.currentTime = this.currentTime;
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

  onDelayedPlay() {
    if (this.clickTimeout) return;

    this.clickTimeout = setTimeout(() => {
      this.play();
    }, 250);
  }

  play() {
    this.clickTimeout = null;
    const videoElement = this.video.nativeElement;
    videoElement.paused ? videoElement.play() : videoElement.pause();
  }

  onPlay() {
    clearTimeout(this.clickTimeout);
    this.play();
  }

  onBackward() {
    this.video.nativeElement.currentTime -= 10;
  }

  onForward() {
    this.video.nativeElement.currentTime += 10;
  }

  onMuteToggle() {
    const videoElement = this.video.nativeElement;
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
    }
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

    // Sync with actual video element
    const videoElement = this.video.nativeElement;
    if (videoElement) videoElement.volume = this.volume;
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
    this.video.nativeElement.playbackRate = value;
  }

  isSpeed(value: number) {
    return value === this.playbackrate;
  }

  // onFullscreen() for button and onFullscreenDelayed() for video-container!!
  onFullScreen() {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = null;

    const videoPlayerElement = this.videoPlayer.nativeElement;
    if (!document.fullscreenElement) {
      videoPlayerElement?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    // if (this.fullScreenEnabled) {
    //   this.videoPlayer.nativeElement.style.width = '640px';
    //   this.videoPlayer.nativeElement.style.height = '360px';
    //   this.fullScreenEnabled = false;
    // } else {
    //   this.videoPlayer.nativeElement.style.width = '100%';
    //   this.videoPlayer.nativeElement.style.height = '100vh';
    //   this.fullScreenEnabled = true;
    // }
  }
}
