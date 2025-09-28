import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

/**
 * Class representing a footer component.
 */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private router = inject(Router);

  /**
   * Check if the current route matches the video offer route.
   * @returns True if the current route matches the video offer route,
   *          otherwise false.
   */
  isVideoOffer() {
    return this.router.url.includes('video/offer');
  }
}
