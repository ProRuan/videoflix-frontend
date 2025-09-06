import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticator } from '@core/auth/services';
import { VideoStore } from '@features/video/services';
import { Button } from '@shared/components/buttons';

@Component({
  selector: 'app-video-header',
  imports: [Button],
  templateUrl: './video-header.html',
  styleUrl: './video-header.scss',
})
export class VideoHeader {
  router = inject(Router);
  auth = inject(Authenticator);
  vs = inject(VideoStore);

  // clean this file ...
  // think about location ...
  // think about video folder structure ...

  // replace test URL
  onSignOut() {
    const token = this.vs.getToken();
    this.router.navigateByUrl(`/sign-out/${token}`);
  }

  onLogOut() {
    const token = this.vs.getToken();
    this.auth.logOut({ token }).subscribe({
      next: () => this.router.navigateByUrl('/log-in'),
    });
  }
}
