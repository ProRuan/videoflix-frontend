import { ViewportScroller } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthStore, UserClient } from '@core/auth/services';
import { Footer } from '@core/layout/components';
import { VideoHeader } from '@features/video/components';
import { VideoGroup } from '@features/video/interfaces';
import { Video } from '@features/video/models';
import { Button } from '@shared/components/buttons';

/**
 * Class representing a video offer component.
 */
@Component({
  selector: 'app-video-offer',
  imports: [Button, Footer, VideoHeader],
  templateUrl: './video-offer.html',
  styleUrl: './video-offer.scss',
})
export class VideoOffer implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private scroller = inject(ViewportScroller);
  private auth = inject(AuthStore);

  // review video header ...
  // review video footer ...

  // use newest video library[0].videos[0] ... ?

  // review ...
  private user: UserClient = inject(UserClient);

  data = toSignal(this.route.data);
  library = computed(() => this.data?.()?.['result'] as VideoGroup[]);

  // review ...
  newVideos = computed(() => this.library()[0].videos);

  video = signal<Video | null>(null);
  id = computed(() => this.video()?.id);
  title = computed(() => this.video()?.title);
  description = computed(() => this.video()?.description);
  previewClip = computed(() => this.video()?.previewClip);

  // use source instead ... ?
  @ViewChild('preview') preview?: ElementRef<HTMLVideoElement>;

  // edit ...
  ngOnInit() {
    this.setRandomVideo();

    this.route.paramMap.subscribe({
      next: (value) =>
        this.user.logIn({
          token: value?.get('token') ?? '',
          email: '',
          user_id: 0,
        }),
    });
  }

  /**
   * Set a random video.
   */
  private setRandomVideo() {
    const id = this.getRandomVideoId();
    this.video.update(() => this.newVideos()[id]);
  }

  /**
   * Get a random video id.
   * @returns - The random video id.
   */
  private getRandomVideoId() {
    const lastId = this.newVideos().length - 1;
    return Math.round(Math.random() * lastId);
  }

  /**
   * Redirect the user to the video player on click.
   */
  onPlay() {
    const url = this.getVideoPlayerUrl();
    this.router.navigateByUrl(url);
  }

  /**
   * Get a video player URL.
   * @returns The video player URL.
   */
  private getVideoPlayerUrl() {
    const token = this.auth.getToken();
    const id = this.id();
    return `/video/player/${token}/${id}`;
  }

  /**
   * Update the video preview on click.
   * @param video - The video to be set.
   */
  onPreview(video: Video) {
    this.video.set(video);
    this.preview?.nativeElement.load();
    this.scroller.scrollToPosition([0, 0], { behavior: 'smooth' });
  }
}
