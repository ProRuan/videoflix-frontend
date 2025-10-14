import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces';
import { AuthStore } from './auth-store';

@Injectable({
  providedIn: 'root',
})
export class UserClient {
  private router = inject(Router);
  private auth = inject(AuthStore);

  // use token instead of getToken and setToken ... ?!

  startEmail: string = '';

  email: string = '';
  id: number = 0;

  constructor() {}

  /**
   * Get the user´s authentication token.
   * @returns The user´s authentication token.
   */
  get token() {
    return this.auth.getToken();
  }

  /**
   * Set the user´s authentication token.
   * @param value - The value to be set.
   */
  set token(value: string) {
    this.auth.setToken(value);
  }

  // rename ... ?!
  logIn(response: AuthResponse) {
    this.email = response.email;
    this.id = response.user_id;
    this.token = response.token;
  }

  // move request or add error notification service
  logOut() {
    this.auth.logOut().subscribe({
      next: () => {
        this.router.navigateByUrl('/log-in');
      },
      // remove
      error: (error) => console.log('logout token error: ', error),
    });
  }

  signOut() {
    const token = this.auth.getToken();
    this.router.navigateByUrl(`/sign-out/${token}`);
  }
}
