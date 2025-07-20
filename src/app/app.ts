import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuccessDialog } from './shared/components/success-dialog/success-dialog';
import { ErrorToast } from './shared/components/error-toast/error-toast';
import { DialogManager } from './shared/services/dialog-manager';
import { ToastManager } from './shared/services/toast-manager';
import { DialogIds, ToastIds } from './shared/ts/enums';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SuccessDialog, ErrorToast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private dialogs: DialogManager = inject(DialogManager);
  private toasts: ToastManager = inject(ToastManager);

  // dialogs (3/3) ...
  // error-toasts (4/7) ...

  // signals check ...
  // enums for components, inputs/controls and form-validators (0/3) ...
  // secondary button ...

  // finalize success dialog ...

  // think about FormValidator naming and code (class/service, structure) ...

  protected title = 'videoflix-frontend';

  isDialogOpen() {
    return this.dialogs.isOpen(DialogIds.SuccessDialog);
  }

  getConfig() {
    return this.dialogs.config;
  }

  isToastOpen() {
    return this.toasts.isOpen(ToastIds.ErrorToast);
  }

  getMessage() {
    return this.toasts.message;
  }
}
