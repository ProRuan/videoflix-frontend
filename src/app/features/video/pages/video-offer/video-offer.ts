import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';

import { Header, Footer } from '@core/layout/components';

import { PrimaryButton } from '@shared/components/buttons';

// edit
import { Videoflix } from '../../../../shared/services/videoflix';
import { Video } from '../../models';
import { VideoData } from '../../interfaces';
import { VideoStore } from '@features/video/services';

@Component({
  selector: 'app-video-offer',
  imports: [Header, PrimaryButton, Footer],
  templateUrl: './video-offer.html',
  styleUrl: './video-offer.scss',
})
export class VideoOffer implements OnInit {
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);
  private vs: VideoStore = inject(VideoStore);

  videos: WritableSignal<Video[]> = signal([]);
  // videos: Video[] = [];
  genres: string[] = [];
  // videosByGenre: { genre: string; videos: Video[] }[] = [];
  videosByGenre: WritableSignal<{ genre: string; videos: Video[] }[]> = signal(
    []
  );
  // videosByGenre: Record<string, Video[]> = {};

  // testing
  // firstVideo: Video = new Video();

  // prepare error toast ...
  ngOnInit() {
    this.vs.listVideos().subscribe({
      next: (value) => this.setVideos(value),
      error: (error) => console.log('loading error'),
    });
    // this.auth.loadVideoOffer().subscribe({
    //   next: (value) => this.setVideos(value),
    //   error: (error) => console.log('loading error'),
    // });
  }

  setVideos(data: VideoData[]) {
    const videos: Video[] = [];
    data.forEach((d) => {
      videos.push(new Video(d));
    });
    // this.videos = [...videos];
    this.videos.set([...videos]);
    console.log('videos: ', this.videos());
    // testing
    // this.firstVideo.set(videos[0]);

    // move
    this.setGenres();
    this.mapVideos();
  }

  setGenres() {
    for (const video of this.videos()) {
      const genre = video.genre;
      if (this.genres.includes(genre)) continue;
      this.genres.push(genre);
    }
    this.genres = [...this.genres.sort()];
    console.log('genres: ', this.genres);
  }

  mapVideos() {
    const videos = [...this.videos()];
    const library: Video[][] = [];
    this.genres.forEach((genre, i) => {
      const videoGenre = videos.filter((v) => v.genre === genre);
      const videoGenreUnsorted = [...videoGenre];
      const videoGenreSorted = [
        ...videoGenreUnsorted.sort((a: Video, b: Video) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        }),
      ];
      library.push(videoGenreSorted);
    });
    console.log('library: ', library);

    const videosByGenre: { genre: string; videos: Video[] }[] = [];
    for (let i = 0; i < this.genres.length; i++) {
      const genre = this.genres[i];
      const lib = library[i];
      videosByGenre.push({ genre: genre, videos: lib });

      // this.videosByGenre[genre] = lib;
    }

    this.videosByGenre.set([...videosByGenre]);
    console.log('videos by genre: ', this.videosByGenre());
  }

  onPlay() {
    this.router.navigateByUrl('video-player');
  }
}
