import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SuccessDialog } from '@shared/components/dialogs';
import { ErrorToast, ErrorToastMobile } from '@shared/components/toasts';
import { DialogIds, ToastIds } from '@shared/constants';
import { DialogManager, ToastManager, WindowResizer } from '@shared/services';

/**
 * Class representing a Videoflix App.
 */
@Component({
  selector: 'app-root',
  imports: [ErrorToast, ErrorToastMobile, RouterOutlet, SuccessDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private dialogs = inject(DialogManager);
  private toasts = inject(ToastManager);
  private resizer = inject(WindowResizer);

  // fix error-toasts on app ... !
  // fix heading two-liners + empty-text ... !
  // create MobileService for resize and rotation events ...

  // video-offer transition also on end ... ?
  // epmpty-message for hero (not library) or entire video-offer ... ?!

  // responsiveness 320/368/400 + 768/1280 + 1440/1920 + 1920+
  // --------------
  // video-player ...
  //   - add player linear-gradient ...
  //   - add translate + 16px at least for header and multi-bar (0/2) ...
  //   - fix quality message for mobile ...
  // video-player-header ...
  // video-player-multi-bar ...
  // video-settings-dialog ...

  // add sign-out button to footer ...

  // review all icon for icons-only vs. icon-with-frame ...

  // video-player media
  // ------------------
  // fix video (media, screen) ...
  // fix video shadow ...
  // fix (click, touch) ...
  // fix (drag, touch) ...
  // fix menus ...

  // use max-width and orientation 'landscape' ...
  //   --> break point: 640px and portrait ...

  // create back-button for video-offer ...
  //   --> OR create back-button with optional back route ...
  //   --> use it for video offer hero (preview) ...

  // last tasks
  // ----------
  // add font-families ... !
  // README for frontend ... !
  // browser check ... !

  protected title = 'videoflix-frontend';

  isMobile = computed(() => this.resizer.isMobile());

  /**
   * Check if a success dialog is open.
   * @returns True if a success dialog is open, otherwise false.
   */
  isDialogOpen() {
    return this.dialogs.isOpen(DialogIds.Success);
  }

  /**
   * Check if an error toast is open.
   * @returns True if an error toast is open, otherwise false.
   */
  isToastOpen() {
    return this.toasts.isOpen(ToastIds.Error);
  }
}
