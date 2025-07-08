import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Videoflix {
  preEmail: string = '';

  routerURL = signal('/');

  setRouterURL(url: string) {
    this.routerURL.set(url);
  }

  isStartsite() {
    this.routerURL() === '/';
  }
}
