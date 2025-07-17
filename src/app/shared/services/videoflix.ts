import { Injectable, signal } from '@angular/core';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Videoflix {
  cachedEmail: string = '';
  user: User = new User();

  routerURL = signal('/');

  setRouterURL(url: string) {
    this.routerURL.set(url);
  }

  isStartsite() {
    return this.routerURL() === '/';
  }

  setAuthData(response: AuthResponse) {
    this.user.setAuthData(response);
  }
}
