import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthFormBase } from '@core/auth/directives';
import { AuthStore, AuthUtils } from '@core/auth/services';
import { Button } from '@shared/components/buttons';
import { LoadingBar } from '@shared/components/loaders';
import { EmptyObject } from '@shared/interfaces';
import { ToastManager } from '@shared/services';

/**
 * Class representing a delete-account component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-delete-account',
  imports: [Button, LoadingBar, ReactiveFormsModule],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
})
export class DeleteAccount extends AuthFormBase<
  EmptyObject,
  EmptyObject,
  void
> {
  route = inject(ActivatedRoute);
  router = inject(Router);
  auth = inject(AuthStore);
  utils = inject(AuthUtils);
  toasts = inject(ToastManager);

  /**
   * Get a default form.
   * @returns The default form.
   */
  getForm(): FormGroup<EmptyObject> {
    return this.utils.getEmptyForm();
  }

  /**
   * Get the payload for default.
   * @returns The payload for default.
   */
  getPayload(): EmptyObject {
    return this.utils.getEmptyPayload();
  }

  /**
   * Request an account deletion from the Videoflix API.
   * @returns An Observable with no response.
   */
  request$(): Observable<void> {
    return this.auth.deleteAccount();
  }

  /**
   * Complete account deletion and redirect user to success page.
   */
  onSuccess(): void {
    this.toasts.close();
    this.router.navigateByUrl('/delete-account/success', { replaceUrl: true });
  }

  /**
   * Show an error toast with details.
   * @param error - The error response.
   */
  onError(error: HttpErrorResponse): void {
    console.log('error: ', error);
  }
}
