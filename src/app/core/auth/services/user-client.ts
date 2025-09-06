import { inject, Injectable } from '@angular/core';
import { User } from '../models';
import { Authenticator } from './authenticator';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces';

type UserKeys = keyof Pick<User, 'email' | 'token'>;

@Injectable({
  providedIn: 'root',
})
export class UserClient {
  private router = inject(Router);
  private auth = inject(Authenticator);

  user = new User();

  constructor() {}

  getId() {
    return this.user.id;
  }

  get(key: UserKeys) {
    return this.user[key];
  }

  logIn(response: AuthResponse) {
    this.user.setAuthData(response);
  }

  logOut() {
    const token = this.user.token;
    this.auth.logOut({ token }).subscribe({
      next: () => {
        this.user.reset();
        this.router.navigateByUrl('/log-in');
      },
    });
  }

  signOut() {
    const token = this.get('token');
    this.router.navigateByUrl(`/sign-out/${token}`);
  }
}
