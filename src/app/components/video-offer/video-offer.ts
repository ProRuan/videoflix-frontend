import { Component, inject } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Videoflix } from '../../shared/services/videoflix';

@Component({
  selector: 'app-video-offer',
  imports: [Header, Footer],
  templateUrl: './video-offer.html',
  styleUrl: './video-offer.scss',
})
export class VideoOffer {
  private videoflix: Videoflix = inject(Videoflix);

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
}
