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

  // update multiple line comments ... !

  // dialogs (3/3) ...
  // error-toasts (4/7) ...

  // enums for components, inputs/controls and form-validators (0/3) ...
  // secondary button ...
  // double code of the 5 form compoents (0/5) ...
  // think about dialog background opacity and dialog box box-shadow ...

  // finalize success dialog ...

  // think about FormValidator naming and code (class/service, structure) ...

  // disabled submit buttons during submission logic ... !!!

  protected title = 'videoflix-frontend';

  isDialogOpen() {
    return this.dialogs.isOpen(DialogIds.Success);
  }

  // getConfig() {
  //   const config = this.dialogs.config();
  //   return config !== null ? config : { title: '', messages: ['', ''] };
  // }

  isToastOpen() {
    return this.toasts.isOpen(ToastIds.Error);
  }

  getMessage() {
    return this.toasts.message;
  }
}
