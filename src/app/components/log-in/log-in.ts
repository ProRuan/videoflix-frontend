import { Component, inject } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { Authentication } from '../../shared/services/authentication';

@Component({
  selector: 'app-log-in',
  imports: [Header, Footer],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  private auth: Authentication = inject(Authentication);

  // center elements by parents (only containers with simple elements) ...
  //   --> startsite, log-in, ...

  // build root component with basic services, variables and methods ... ?
  // review startsite.ts (see sign-up.ts) --> abstract class ... ?

  // destroy subscriptions ...
  // move form tag for other components (form, inputs, buttons) ...

  // update input validator and input validation!!
  // error text with end dots!
  // remove matchword validator ... ?

  // check font-family for inputs and buttons ... !

  // error toast idea (error_toast_20250712) ...

  message: string = '';

  onLogin() {
    const payload = {
      username: 'luigiSpukhaus',
      password: 'Test123!',
    };

    this.auth.loginUser(payload).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.message = 'Login successful!';
        // optionally save token in localStorage:
        // localStorage.setItem('authToken', response.token);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.message = 'Login failed. Check username and password.';
      },
    });
  }
}
