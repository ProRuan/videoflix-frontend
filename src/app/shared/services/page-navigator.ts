import { Injectable } from '@angular/core';
import { getSessionItem, setSessionItem } from '@shared/utils';

/**
 * Class representing a page navigator service.
 */
@Injectable({
  providedIn: 'root',
})
export class PageNavigator {
  currentUrl: string = '';
  previousUrl: string = '';

  /**
   * Set current and previous URL.
   * @param url - The current URL.
   */
  setUrls(url: string) {
    this.previousUrl = getSessionItem('previousUrl', String());
    this.currentUrl = url;
  }

  /**
   * Update current and previous URL.
   * @param url - The current URL.
   */
  updateUrls(url: string) {
    this.previousUrl = this.currentUrl;
    this.currentUrl = url;
    setSessionItem('previousUrl', this.previousUrl);
  }

  isHome() {
    return this.currentUrl === '/';
  }
}
