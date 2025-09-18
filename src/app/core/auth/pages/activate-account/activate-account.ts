import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { AuthFormBase } from '@core/auth/directives';
import { AuthResponse, FormGroupControls } from '@core/auth/interfaces';
import { Button } from '@shared/components/buttons';
import { LoadingBar } from '@shared/components/loaders';
import { FormValidator } from '@shared/modules/form-validation';

/**
 * Class representing an activate-account component.
 * @extends AuthFormBase
 */
@Component({
  selector: 'app-activate-account',
  imports: [Button, LoadingBar],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss',
})
export class ActivateAccount extends AuthFormBase {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  data: Signal<Data | undefined> = toSignal(this.route.data);
  response: Signal<AuthResponse> = computed(() => this.data()?.['response']);
  token: Signal<string> = computed(() => this.response()?.token);

  protected controls: FormGroupControls = {
    token: [this.token(), FormValidator.tokenValidators],
  };

  /**
   * Perform an activate-account request on submit.
   *
   * Redirect to the activate-account success page on success;
   * shows an error toast on error.
   */
  onActivate() {
    this.performRequest('activateAccount', () => this.handleSuccess());
  }

  /**
   * Redirect to the activate-account success page.
   */
  private handleSuccess(): void {
    this.toasts.close();
    this.router.navigateByUrl('/activate-account/success');
  }
}
