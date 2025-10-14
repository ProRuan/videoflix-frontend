import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { UserClient } from '@core/auth/services';
import { VideoOfferFacade } from '@features/video/services';
import { Button } from '@shared/components/buttons';

/**
 * Class representing a video offer hero component.
 *
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-video-offer-hero',
  imports: [Button],
  templateUrl: './video-offer-hero.html',
  styleUrl: './video-offer-hero.scss',
})
export class VideoOfferHero implements AfterViewInit {
  private router = inject(Router);
  private user = inject(UserClient);
  private facade = inject(VideoOfferFacade);

  id = computed(() => this.facade.video()?.id);
  title = computed(() => this.facade.video()?.title);
  description = computed(() => this.facade.video()?.description);
  previewClip = computed(() => this.facade.video()?.previewClip);

  preview = viewChild<ElementRef<HTMLVideoElement>>('preview');

  /**
   * Initialize viewable HTML elements.
   */
  ngAfterViewInit() {
    this.setVideoPreview();
  }

  /**
   * Set the viewable video preview.
   */
  private setVideoPreview() {
    this.facade.preview.set(this.preview());
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
    const token = this.user.token;
    const id = this.id();
    return `/video/player/${token}/${id}`;
  }
}
