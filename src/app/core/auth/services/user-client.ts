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

  startEmail: string = '';

  email: string = '';
  id: number = 0;

  constructor() {}

  logIn(response: AuthResponse) {
    this.email = response.email;
    this.id = response.user_id;
    // move ... ?
    this.auth.setToken(response.token);
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
