import { Component, inject } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Authentication } from '../../shared/services/authentication';

@Component({
  selector: 'app-sign-up',
  imports: [Header, Footer],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private auth: Authentication = inject(Authentication);

  message: string = '';

  // use variables!!!
  onRegister() {
    const payload = {
      username: 'kirbyDreamland',
      email: 'dreamland@mail.com',
      password: 'Test123!',
      repeated_password: 'Test123!',
    };

    // const payload = {
    //   username: 'luigiSpukhaus',
    //   email: 'spukhaus@mail.com',
    //   password: 'Test123!',
    //   repeated_password: 'Test123!',
    // };

    this.auth.registerUser(payload).subscribe({
      next: (response) => {
        console.log('Token:', response.token);
        console.log('User ID:', response.user_id);
        this.message = `Welcome, ${response.username}!`;

        // Optional: Save token in localStorage
        // localStorage.setItem('auth_token', response.token);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.message = 'Registration failed. Please try again.';
      },
    });
  }
}
