import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Authentication } from '../../shared/services/authentication';
import { Videoflix } from '../../shared/services/videoflix';

@Component({
  selector: 'app-sign-up',
  imports: [Header, Footer],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp implements OnInit {
  private videoflix: Videoflix = inject(Videoflix);
  private auth: Authentication = inject(Authentication);

  // create EmailInputComponent ...
  // create PasswordInputComponent ...
  // replace hex with rgba values (from Figma) ...
  // check image (bg) size ... !
  // center elements by parents (only containers with simple elements) ...
  //   --> startsite, log-in, ...

  // build root component with basic services, variables and methods ... ?

  preEmail: string = '';
  message: string = '';

  ngOnInit(): void {
    this.videoflix.setRouterURL('sign-up');
    this.preEmail = this.videoflix.preEmail;
    console.log('pre-email: ', this.videoflix.preEmail);
  }

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
