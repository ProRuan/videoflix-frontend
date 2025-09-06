import { inject, Injectable } from '@angular/core';
import { Api } from '@shared/services/api';

/**
 * Class representing a video progress store service.
 * @extends {ApiBase}
 */
@Injectable({
  providedIn: 'root',
})
export class VideoProgressStore {
  api = inject(Api);

  // get, add, update, delete ...
  // authenticator: rename it to auth-store ...
  //   --> replace API with auth-store (comments) ...
  // think about Videoflix service ...
  // reset-password payload: token or email is missing for status code 200 ...
  // token must be variable!
  // think about payload!
}
