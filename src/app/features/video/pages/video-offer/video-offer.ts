import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Header, Footer } from '@core/layout/components';
import { VideoGroup, VideoGroupData } from '@features/video/interfaces';
import { Video } from '@features/video/models';
import { VideoStore } from '@features/video/services';
import { PrimaryButton } from '@shared/components/buttons';

/**
 * Class representing a video offer component.
 */
@Component({
  selector: 'app-video-offer',
  imports: [Header, PrimaryButton, Footer],
  templateUrl: './video-offer.html',
  styleUrl: './video-offer.scss',
})
export class VideoOffer implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private vs: VideoStore = inject(VideoStore);

  // select preview video randomly ...
  // add select video logic ...
  // prepare error toast ...

  libraryData: WritableSignal<VideoGroupData[]> = signal([]);
  library: WritableSignal<VideoGroup[]> = signal([]);

  // prepare error toast ...
  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (value) => this.vs.setToken(value?.get('token') ?? ''),
    });
    this.vs.listVideos().subscribe({
      next: (value) => this.setVideoLibrary(value),
      error: (error) => console.log('error: ', error),
    });
  }

  setVideoLibrary(libraryData: VideoGroupData[]) {
    this.libraryData.set([...libraryData]);
    console.log('video genre groups: ', this.libraryData());
    const lib: VideoGroup[] = [];
    for (let g of this.libraryData()) {
      const videoData = g.videos;
      const videos = videoData.map((v) => new Video(v));
      const group = { genre: g.genre, videos: videos };
      lib.push(group);
    }
    this.library.set([...lib]);
    console.log('converted video genre groups: ', this.library());
  }

  onPlay() {
    this.router.navigateByUrl('/video-player');
  }
}
