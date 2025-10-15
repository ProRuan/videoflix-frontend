import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { finalize } from 'rxjs';

import { AuthStore, UserClient } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { ToastManager } from '@shared/services';

/**
 * Class representing a video offer header component.
 */
@Component({
  selector: 'app-video-offer-header',
  imports: [Button],
  templateUrl: './video-offer-header.html',
  styleUrl: './video-offer-header.scss',
})
export class VideoOfferHeader {
  private router = inject(Router);
  private auth = inject(AuthStore);
  private user = inject(UserClient);
  private toasts = inject(ToastManager);

  isLoading = signal(false);

  /**
   * Redirect to the sign-out on click.
   */
  onSignOut() {
    const token = this.auth.getToken();
    const url = `/sign-out/${token}`;
    this.router.navigateByUrl(url);
  }

  /**
   * Log out and redirect to the log-in on click.
   */
  onLogOut() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.auth
      .logOut()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => this.resetAndRedirect(),
        error: (error: HttpErrorResponse) => this.toasts.showError(error),
      });
  }

  /**
   * Reset user data and redirect to log-in.
   */
  private resetAndRedirect() {
    this.user.reset();
    this.router.navigateByUrl('/log-in');
  }
}
