import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

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
   * @returns The ID as string.
   */
  private getId(route: ActivatedRouteSnapshot) {
    return route.paramMap.get('id') ?? '0';
  }

  /**
   * Check if a value represents an ID.
   * @param value - The value to be checked.
   * @returns True if the value is not an ID, otherwise false.
   */
  private isNotId(value: string) {
    const number = Number(value);
    return isNaN(number) || number < 0;
  }

  /**
   * Get a URL tree.
   * @returns The URL tree.
   */
  private getUrlTree() {
    return this.router.createUrlTree(['/bad-request']);
  }
}
