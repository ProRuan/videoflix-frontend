import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Videoflix } from '../../shared/services/videoflix';
import { Video } from '../../shared/models/video';
import { Authentication } from '../../shared/services/authentication';

@Component({
  selector: 'app-video-offer',
  imports: [Header, Footer],
  templateUrl: './video-offer.html',
  styleUrl: './video-offer.scss',
})
export class VideoOffer implements OnInit {
  private videoflix: Videoflix = inject(Videoflix);
  private auth: Authentication = inject(Authentication);

  // use FormValidator.passwordMatch() instead of signals ... !!!

  // abstract class BaseDialog ... ?
  // component BaseDialog with Input() textConfig ... ?
  // global style or mixin for button-cont ... ?

  // global error toast ... ?
  // global dialogs ... ?
  // automatic current router URL by router methods ... ?!

  // fix headline-2 line-height ... !
  // global flex-center style ... ?
  // stabilize onSubmit() methods with if-valid condition ... !!!

  // check emitEvent: false and markAs*() for resetForm() ...
  // interfaces Control and StringSignal, BooleanSignal and so on ...
  // review log-in component for error toast and form (controls) ... !
  // email, password variable vs. getter (2/5) ... ?!
  // global error toast vs. local error toasts ... ?!
  // work with DialogManager service ...
  // work with ToastManager service ...
  // replace DialogIds with Interface and index signature ... ?
  // use ToastIds or interface as well ...
  // ----------------------------------
  // log-in: disable input validation and errors ... !!!
  // add cookie service ... ?!
  // check this component for double code ...
  // inner dialog tag and/or dialog service with signals ... ?!
  // error toast with action "Already registered? Redirect to log-in?" ...
  // current tasks
  // -------------
  // move dialog tag into the dialog component ... ?
  // think about click, close and stop events ... !
  // https://angular.dev/guide/http/making-requests
  // center elements by parents (only containers with simple elements) ...
  //   --> startsite, log-in, ...
  // build root component with basic services, variables and methods ... ?
  // review startsite.ts (see sign-up.ts) --> abstract class ... ?
  // destroy subscriptions ...
  // move form tag for other components (form, inputs, buttons) ...
  // update input validator and input validation!!
  // error text with end dots!
  // remove matchword validator ... ?
  // check font-family for inputs and buttons ... !
  // simplify computed signals (no extra function) ...
  // destroy subscriptions/signals ...
  // error toast idea (error_toast_20250712) ...
  // add error-toast-cta component (e. g. button for continue video progress) ... !
  // set private, readonly and so on (also for other components) ... !
  // move/delete interface Video ...
  // set button type submit/button ... !
  // Sign-Up
  // -------
  // clean global dialog styles ...
  // create an abstract base dialog class ... ?
  // delete cachedEmail on destroy ... !
  // sign-up-success-dialog: log-in button ... ?
  // backend: email-check endpoint for startsite and forgot-password ... !
  // think about DOM service ... ?!
  // unsubscribe subscriptions and signals (destroyUntil) ... !
  // add return types of all functions ...
  // do ReturnType documentation for the entire project ... !!!
  // button-disabled: cursor:default as global style ... !
  // Log-in component
  // ----------------
  // setAuthData() ... ?!
  // save auth data locally (token, email?, id?) (0/3) ... ?!
  // rename Authentication service to Authenticator ... !

  // reset-password: payload token must be variable ... !
  //   --> use email instead of token ... !

  videos: Video[] = [];
  genres: string[] = [];
  videosByGenre: { genre: string; videos: Video[] }[] = [];
  // videosByGenre: Record<string, Video[]> = {};

  // testing
  firstVideo: Video = new Video();

  // backend sorts by genre, -created_at and by title ...
  // backend creates an object { [key: string]: Video[] } ...
  // frontend simply renders videos ...
  ngOnInit() {
    this.auth.loadVideoOffer().subscribe({
      next: (value) => this.setVideos(value),
      error: (error) => console.log('loading error'),
    });
  }

  setVideos(videos: Video[]) {
    videos.forEach((video) => {
      this.videos.push(new Video(video));
    });
    // this.videos = [...videos];
    console.log('videos: ', this.videos);
    // testing
    this.firstVideo.set(videos[0]);

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
}
