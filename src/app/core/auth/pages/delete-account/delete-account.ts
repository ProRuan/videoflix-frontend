import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthFormBase } from '@core/auth/directives';
import { AuthFormUtils, AuthStore } from '@core/auth/services';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(AuthStore);
  private utils = inject(AuthFormUtils);
  private toasts = inject(ToastManager);

  /**
   * Get a default form.
   * @returns The default form.
   */
  protected getForm(): FormGroup<EmptyObject> {
    return this.utils.getEmptyForm();
  }

  /**
   * Get the payload for default.
   * @returns The payload for default.
   */
  protected getPayload(): EmptyObject {
    return this.utils.getEmptyPayload();
  }

  /**
   * Request an account deletion from the Videoflix API.
   * @returns An Observable with no response.
   */
  protected request$(): Observable<void> {
    return this.auth.deleteAccount();
  }

  /**
   * Complete account deletion and redirect user to success page.
   */
  protected onSuccess(): void {
    this.form.reset();
    this.router.navigate(['success'], {
      relativeTo: this.route.parent,
      replaceUrl: true,
    });
  }

  /**
   * Show an error toast upon failed account deletion.
   * @param error - The error response.
   */
  protected onError(error: HttpErrorResponse): void {
    this.toasts.showError(error);
  }

  /**
   * Close error toast.
   */
  protected override destroyOptions(): void {
    this.toasts.close();
  }
}
