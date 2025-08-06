import { Component, inject, OnInit } from '@angular/core';
import { Header, Footer } from '../../core/layout';
import { Videoflix } from '../../shared/services/videoflix';
import { Video } from '../../shared/models/video';
import { Authentication } from '../../shared/services/authentication';
import { Router } from '@angular/router';
import { PrimaryButton } from '../../shared/components/primary-button/primary-button';
import { VideoData } from '../../shared/interfaces/video-data';

@Component({
  selector: 'app-video-offer',
  imports: [Header, PrimaryButton, Footer],
  templateUrl: './video-offer.html',
  styleUrl: './video-offer.scss',
})
export class VideoOffer implements OnInit {
  private router: Router = inject(Router);
  private videoflix: Videoflix = inject(Videoflix);
  private auth: Authentication = inject(Authentication);

  videos: Video[] = [];
  genres: string[] = [];
  videosByGenre: { genre: string; videos: Video[] }[] = [];
  // videosByGenre: Record<string, Video[]> = {};

  // testing
  // firstVideo: Video = new Video();

  // prepare error toast ...
  ngOnInit() {
    // this.auth.loadVideoOffer().subscribe({
    //   next: (value) => this.setVideos(value),
    //   error: (error) => console.log('loading error'),
    // });
  }

  setVideos(data: VideoData[]) {
    data.forEach((d) => {
      this.videos.push(new Video(d));
    });
    // this.videos = [...videos];
    console.log('videos: ', this.videos);
    // testing
    // this.firstVideo.set(videos[0]);

    // move
    this.setGenres();
    this.mapVideos();
  }

  setGenres() {
    for (const video of this.videos) {
      const genre = video.genre;
      if (this.genres.includes(genre)) continue;
      this.genres.push(genre);
    }
    this.genres = [...this.genres.sort()];
    console.log('genres: ', this.genres);
  }

  mapVideos() {
    const videos = [...this.videos];
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

    for (let i = 0; i < this.genres.length; i++) {
      const genre = this.genres[i];
      const lib = library[i];
      this.videosByGenre.push({ genre: genre, videos: lib });
      // this.videosByGenre[genre] = lib;
    }
    console.log('videos by genre: ', this.videosByGenre);
  }

  onPlay() {
    this.router.navigateByUrl('video-player');
  }
}
