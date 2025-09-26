import { inject, Injectable } from '@angular/core';
import { User } from '../models';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces';
import { AuthStore } from './auth-store';

type UserKeys = keyof Pick<User, 'email' | 'token'>;

@Injectable({
  providedIn: 'root',
})
export class UserClient {
  private router = inject(Router);
  private auth = inject(AuthStore);

  startEmail: string = '';

  email: string = '';
  id: number = 0;

  // remove ... ?
  user = new User();

  constructor() {}

  getId() {
    return this.user.id;
  }

  get(key: UserKeys) {
    return this.user[key];
  }

  logIn(response: AuthResponse) {
    this.email = response.email;
    this.id = response.user_id;
    // move ... ?
    this.auth.setToken(response.token);
    // remove ... !
    this.user.setAuthData(response);
  }

  // move request or add error notification service
  logOut() {
    this.auth.logOut().subscribe({
      next: () => {
        this.user.reset();
        this.router.navigateByUrl('/log-in');
      },
      // remove
      error: (error) => console.log('logout token error: ', error),
    });
  }

  signOut() {
    const token = this.get('token');
    this.router.navigateByUrl(`/sign-out/${token}`);
  }
}
