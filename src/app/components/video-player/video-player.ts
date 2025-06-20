import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer {
  // remove test video from public folder ...

  playing: boolean = false;
  fullScreenEnabled: boolean = false;

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    console.log('video: ', this.video.nativeElement);
    console.log('video current time: ', this.video.nativeElement.currentTime);

    setTimeout(() => {
      console.log('video current time: ', this.video.nativeElement.currentTime);
    }, 3000);
  }

  onPlay() {
    if (this.playing) {
      this.video.nativeElement.pause();
      this.playing = false;
    } else {
      this.video.nativeElement.play();
      this.playing = true;
    }
  }

  onBackward() {
    this.video.nativeElement.currentTime -= 10;
  }

  onForward() {
    this.video.nativeElement.currentTime += 10;
  }

  onVolume() {
    this.video.nativeElement.volume -= 0.1;
  }

  onPlaybackrate() {
    this.video.nativeElement.playbackRate = 2;
  }

  onFullScreen() {
    if (this.fullScreenEnabled) {
      this.video.nativeElement.style.width = '640px';
      this.video.nativeElement.style.height = '360px';
      this.fullScreenEnabled = false;
    } else {
      this.video.nativeElement.style.width = '100%';
      this.video.nativeElement.style.height = '100vh';
      this.fullScreenEnabled = true;
    }
  }
}
