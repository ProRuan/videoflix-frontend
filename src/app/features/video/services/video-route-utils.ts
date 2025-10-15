import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Router,
} from '@angular/router';

import { catchError, map, of } from 'rxjs';

import { VideoGroup, VideoGroupData } from '../interfaces';
import { PlayableVideo, Video } from '../models';

import { VideoStore } from './video-store';

/**
 * Class representing video route utils.
 *
 * Provides methods for video router guards and video route data resolvers.
 */
@Injectable({
  providedIn: 'root',
})
export class VideoRouteUtils {
  private router = inject(Router);
  private store = inject(VideoStore);

  /**
   * Check if the activated route contains an ID.
   * @param route - The ActivatedRouteSnapshot.
   * @returns True or a URL tree.
   */
  checkId(route: ActivatedRouteSnapshot) {
    const id = this.getId(route);
    return this.isNotId(id) ? this.getUrlTree() : true;
  }

  /**
   * Get an ID from the activated route.
   * @param route - The ActivatedRouteSnapshot.
   * @returns The ID from the activated route.
   */
  private getId(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id') ?? '0';
    return Number(id);
  }

  /**
   * Check if a value represents an ID.
   * @param value - The value to be checked.
   * @returns True if the value is not an ID, otherwise false.
   */
  private isNotId(value: number) {
    return isNaN(value) || value < 0;
  }

  /**
   * Get a URL tree.
   * @returns The URL tree.
   */
  private getUrlTree() {
    return this.router.createUrlTree(['/bad-request']);
  }

  /**
   * Resolve a video list.
   * @returns An Observable with video group array or redirect command.
   */
  resolveVideoList() {
    return this.store.listVideos().pipe(
      map((data: VideoGroupData[]) => this.convertLibrary(data)),
      catchError(() => this.redirect$('/unauthorized'))
    );
  }

  /**
   * Convert a video library.
   * @param data - The video group data array.
   * @returns The video group array.
   */
  private convertLibrary(data: VideoGroupData[]): VideoGroup[] {
    return data.map((group) => this.convertVideoGroup(group));
  }

  /**
   * Convert a video group.
   * @param data - The video group data.
   * @returns The video group.
   */
  private convertVideoGroup(data: VideoGroupData): VideoGroup {
    return {
      genre: data.genre,
      videos: data.videos.map((video) => new Video(video)),
    };
  }

  /**
   * Redirect to an alternative route.
   * @param url - The alternative URL.
   * @returns An Observable with a redirect command.
   */
  private redirect$(url: string) {
    const urlTree = this.router.parseUrl(url);
    const command = new RedirectCommand(urlTree);
    return of(command);
  }

  /**
   * Resolve a video.
   * @param route - The ActivatedRouteSnapshot.
   * @returns An Observable with playable video or redirect command.
   */
  resolveVideo(route: ActivatedRouteSnapshot) {
    const id = this.getId(route);
    return this.store.retrieveVideo(id).pipe(
      map((data) => new PlayableVideo(data)),
      catchError(() => this.redirect$('/video/not-found'))
    );
  }
}
