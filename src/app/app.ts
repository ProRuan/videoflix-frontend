import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { DialogIds, ToastIds } from '@shared/constants';
import { SuccessDialog } from '@shared/components/dialogs';
import { ErrorToast } from '@shared/components/toasts';

import { DialogManager } from './shared/services/dialog-manager';
import { ToastManager } from './shared/services/toast-manager';
import { filter, map } from 'rxjs';
import { PageNavigator } from '@shared/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SuccessDialog, ErrorToast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private navigator = inject(PageNavigator);
  private dialogs = inject(DialogManager);
  private toasts = inject(ToastManager);

  // update multiple line comments ... !

  // dialogs (3/3) ...
  // error-toasts (4/7) ...

  // finalize success dialog ...

  // auth form: think about "matchError" --> "mismatched" ... ?!

  // think about FormValidator naming and code (class/service, structure) ...

  // disabled submit buttons during submission logic ... !!!

  // Important tasks for later
  // -------------------------
  // 1. startsite: implement AuthForm and email-check (backend) ...
  // 2. rebuild project with file schematics ... !!!

  // 3. secondary button style + fix blinking styles (0/2):
  // .button {
  //   @include border($b: none, $br: 40px);
  //   @include spacing($p: 12px 24px);
  //   @include size($w: fit-content, $h: 48px);
  //   @include font($fw: 700);
  //   @include colors($c: $primBlue, $bgc: $white);
  //   transition: color 100ms ease-in-out, background-color 100ms ease-in-out;

  //   &:hover {
  //     @include colors($c: $white, $bgc: $hoverBlue);
  //   }

  //   &:active {
  //     @include colors($c: $white, $bgc: $activeBlue);
  //   }

  //   &:disabled {
  //     background-color: $disabled;
  //     cursor: default;
  //   }
  // }

  protected title = 'videoflix-frontend';

  private initialized: boolean = false;

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((route) => route.url)
      )
      .subscribe((url) => this.updateUrls(url));
  }

  updateUrls(url: string) {
    if (this.initialized) {
      this.navigator.updateUrls(url);
    } else {
      this.navigator.setUrls(url);
      this.initialized = true;
    }
  }

  isDialogOpen() {
    return this.dialogs.isOpen(DialogIds.Success);
  }

  isToastOpen() {
    return this.toasts.isOpen(ToastIds.Error);
  }
}
