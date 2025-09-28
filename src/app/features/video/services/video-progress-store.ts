import { inject, Injectable } from '@angular/core';
import { BaseStore } from '@shared/services';

/**
 * Class representing a video progress store service.
 * @extends {ApiBase}
 */
@Injectable({
  providedIn: 'root',
})
export class VideoProgressStore {
  store = inject(BaseStore);

  // get, add, update, delete ...
  // authenticator: rename it to auth-store ...
  //   --> replace API with auth-store (comments) ...
  // think about Videoflix service ...
  // reset-password payload: token or email is missing for status code 200 ...
  // token must be variable!
  // think about payload!
}
