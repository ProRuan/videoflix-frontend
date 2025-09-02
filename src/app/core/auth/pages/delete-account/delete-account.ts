import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { AuthFormBase } from '@core/auth/directives';
import { FormGroupControls, TokenCheckResponse } from '@core/auth/interfaces';
import { Button } from '@shared/components/buttons';
import { LoadingBar } from '@shared/components/loaders';
import { FormValidator } from '@shared/modules/form-validation';

type Response = TokenCheckResponse;

/**
 * Class representing a delete-account component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-delete-account',
  imports: [Button, LoadingBar],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
})
export class DeleteAccount extends AuthFormBase {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  data: Signal<Data | undefined> = toSignal(this.route.data);
  response: Signal<Response> = computed(() => this.data()?.['response']);
  token: Signal<string> = computed(() => this.response()?.token);

  protected controls: FormGroupControls = {
    token: [this.token(), FormValidator.tokenValidators],
  };

  /**
   * Perform an delete-account request on submit.
   *
   * Redirect to the delete-account success page on success;
   * shows an error toast on error.
   */
  onDelete() {
    this.performRequest('deleteAccount', () => this.handleSuccess());
  }

  /**
   * Redirect to the delete-account success page.
   */
  private handleSuccess(): void {
    this.toasts.close();
    this.router.navigateByUrl('/delete-account/success');
  }
}
