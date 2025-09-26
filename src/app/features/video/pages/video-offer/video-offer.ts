import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore, UserClient } from '@core/auth/services';

import { Footer } from '@core/layout/components';
import { VideoHeader } from '@features/video/components';
import { VideoGroup, VideoGroupData } from '@features/video/interfaces';
import { Video } from '@features/video/models';
import { VideoStore } from '@features/video/services';
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
  private auth = inject(AuthStore);
  private user: UserClient = inject(UserClient);
  private vs: VideoStore = inject(VideoStore);

  // horizontal navigation menu: left scroll right ...
  // mobile scrolling by swiping (overflow-x: auto) ...
  // show UI only on container hover ...
  // finalize UI navigation style ...

  // better: native scroll bar with custom styling ... ?

  data = toSignal(this.route.data);
  library = computed(() => this.data?.()?.['result'] as VideoGroup[]);

  libraryData: WritableSignal<VideoGroupData[]> = signal([]);
  // library: WritableSignal<VideoGroup[]> = signal([]);

  title: WritableSignal<string> = signal('Mighty Magic');
  description: WritableSignal<string> = signal('Magic is powerful');

  video?: WritableSignal<Video>;
  videoId: number = 0;

  currentTranslation: WritableSignal<number[]> = signal([]);
  leftStop: WritableSignal<number[]> = signal([]);

  scrollData: WritableSignal<
    {
      delta: number;
      track: number;
      indicator: number;
      trackPercent: number;
    }[]
  > = signal([]);

  scrollArea = signal(false);

  @ViewChild('preview') preview?: ElementRef<HTMLVideoElement>;

  @ViewChildren('genreRowTrack') genreRowTrack?: QueryList<
    ElementRef<HTMLDivElement>
  >;
  @ViewChildren('genreRowButton') genreRowButton?: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ViewChildren('genreRow') genreRow?: QueryList<ElementRef<HTMLDivElement>>;

  ngOnInit() {
    window.addEventListener('resize', (event) => {
      this.leftStop.update((values) =>
        values.map((v, i) => {
          const track =
            this.genreRowTrack?.get(i)?.nativeElement.clientWidth ?? 0;
          const indicator =
            this.genreRow?.get(i)?.nativeElement.scrollWidth ?? 0;
          console.log('delta: ', track - indicator);

          return track - indicator;
        })
      );
    });

    this.preview?.nativeElement.setAttribute('type', 'video/mp4');
    this.preview?.nativeElement.setAttribute(
      'src',
      this.library()[0].videos[0].previewClip
    );
    this.preview?.nativeElement.play();
    const values = this.library().map(() => 0);
    this.currentTranslation.set([...values]);
    this.leftStop.set([...values]);
    const scrollDefaultData = values.map((v) => {
      return {
        delta: 0,
        track: 0,
        indicator: 0,
        trackPercent: 0,
      };
    });
    this.videoId = this.library()[0].videos[0].id ?? 0;
    this.scrollData.set([...scrollDefaultData]);
    this.route.paramMap.subscribe({
      next: (value) =>
        this.user.logIn({
          token: value?.get('token') ?? '',
          email: '',
          user_id: 0,
        }),
    });
  }

  ngAfterViewInit() {
    this.leftStop.update((values) =>
      values.map((v, i) => {
        const track =
          this.genreRowTrack?.get(i)?.nativeElement.clientWidth ?? 0;
        const indicator = this.genreRow?.get(i)?.nativeElement.scrollWidth ?? 0;
        // console.log('delta: ', track - indicator, track, indicator);
        const scrollData = {
          delta: track - indicator,
          track: track,
          indicator: indicator,
          trackPercent: Math.round((track / indicator) * 100),
        };
        console.log('scroll data: ', scrollData);
        this.scrollData()[i] = scrollData;

        return track - indicator;
      })
    );

    console.log('scroll data: ', this.scrollData());

    // mousewheel events
    // this.genreRow?.forEach((r, i) => {
    //   const row = r.nativeElement;
    //   row.addEventListener('mousewheel', (event) => this.onScroll(event, i), {
    //     passive: false,
    //   });
    // });
  }

  switchScrollArea() {
    this.scrollArea.update((value) => !value);
  }

  onScroll(event: Event, index: number) {
    console.log('event: ', index);
    event.preventDefault();
    const row = this.genreRow?.get(index)?.nativeElement;
    const wheelEvent = event as WheelEvent;

    if (wheelEvent.deltaY < 0) {
      // if (this.currentTranslation()[index] < 0) {
      //   event.preventDefault();
      // }
      const test = this.currentTranslation()[index] + 213 + 16;
      this.currentTranslation()[index] = Math.min(0, test);
      row?.setAttribute(
        'style',
        `transform: translateX(${
          this.currentTranslation()[index]
        }px); transition: transform 300ms ease-in-out`
      );
    }
    if (wheelEvent.deltaY > 0) {
      // if (this.currentTranslation()[index] > this.leftStop()[index]) {
      //   event.preventDefault();
      // }
      const delta = this.leftStop()[index];
      const test = this.currentTranslation()[index] - 213 - 16;
      this.currentTranslation()[index] = Math.max(delta, test);
      row?.setAttribute(
        'style',
        `transform: translateX(${
          this.currentTranslation()[index]
        }px); transition: transform 300ms ease-in-out`
      );
    }
  }

  onPlay() {
    const token = this.auth.getToken();
    const id = this.getVideoId();
    this.router.navigateByUrl(`/video/player/${token}/${id}`);
  }

  setVideo(video: Video) {
    this.setVideoId(video.id);
    this.video?.set(video);

    this.preview?.nativeElement.setAttribute('src', video.previewClip);
    this.title.set(video.title);
    this.description.set(video.description);

    console.log('genre row: ', this.genreRow);
  }

  getVideoId() {
    return this.videoId.toString();
  }

  setVideoId(id: number) {
    this.videoId = id;
  }

  // set slide limit - check
  onToRight($index: number) {
    console.log('to right: ', $index);
    const row = this.genreRow?.get($index);
    console.log('row from left: ', row);

    const test = this.currentTranslation()[$index] + 213 + 16;
    this.currentTranslation()[$index] = Math.min(0, test);
    row?.nativeElement.setAttribute(
      'style',
      `transform: translateX(${
        this.currentTranslation()[$index]
      }px); transition: transform 300ms ease-in-out`
    );
  }

  // set lide limit ...
  onToLeft($index: number) {
    console.log('to left: ', $index);
    const row = this.genreRow?.get($index);
    console.log('row from right: ', row);

    const delta = this.leftStop()[$index];
    const test = this.currentTranslation()[$index] - 213 - 16;
    this.currentTranslation()[$index] = Math.max(delta, test);
    row?.nativeElement.setAttribute(
      'style',
      `transform: translateX(${
        this.currentTranslation()[$index]
      }px); transition: transform 300ms ease-in-out`
    );
  }
}
