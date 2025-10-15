import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { AuthResponse } from '@core/auth/interfaces';
import { UserClient } from '@core/auth/services';
import { VideoGroup } from '@features/video/interfaces';
import { VideoOfferFacade } from '@features/video/services';

import {
  VideoOfferFooter,
  VideoOfferHeader,
  VideoOfferHero,
  VideoOfferLibrary,
} from './components';

/**
 * Class representing a video offer component.
 * @implements {OnInit}
 */
@Component({
  selector: 'app-video-offer',
  imports: [
    VideoOfferFooter,
    VideoOfferHeader,
    VideoOfferHero,
    VideoOfferLibrary,
  ],
  templateUrl: './video-offer.html',
  styleUrl: './video-offer.scss',
})
export class VideoOffer implements OnInit {
  private route = inject(ActivatedRoute);
  private user = inject(UserClient);
  private facade = inject(VideoOfferFacade);

  data = toSignal(this.route.data);
  response = computed(() => this.data()?.['response'] as AuthResponse);
  library = computed(() => this.data?.()?.['library'] as VideoGroup[]);
  hasLibrary = computed(() => this.library().length > 0);

  /**
   * Initialize a video offer component.
   */
  ngOnInit() {
    this.setUser();
    this.setPreview();
    this.setLibrary();
  }

  /**
   * Set the current user.
   */
  private setUser() {
    this.user.set(this.response());
  }

  /**
   * Set the video preview.
   */
  private setPreview() {
    if (!this.hasLibrary()) return;
    const id = this.getRandomVideoId();
    const video = this.getRandomVideo(id);
    this.facade.video.set(video);
  }

  /**
   * Get a random video id.
   * @returns - The random video id.
   */
  private getRandomVideoId() {
    const amount = this.getAmountOfNewVideos();
    return Math.round(Math.random() * amount);
  }

  /**
   * Get an amount of new videos.
   * @returns The amount of new videos.
   */
  private getAmountOfNewVideos() {
    return this.library()[0].videos.length - 1;
  }

  /**
   * Get a random video.
   * @param id - The video id.
   * @returns The random video.
   */
  private getRandomVideo(id: number) {
    return this.library()[0].videos.at(id) ?? null;
  }

  /**
   * Set the video library.
   */
  private setLibrary() {
    this.facade.library.set(this.library());
  }
}
