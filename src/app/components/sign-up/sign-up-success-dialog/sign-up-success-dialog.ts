import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryButton } from '../../../shared/components/primary-button/primary-button';

@Component({
  selector: 'app-sign-up-success-dialog',
  imports: [PrimaryButton],
  templateUrl: './sign-up-success-dialog.html',
  styleUrl: './sign-up-success-dialog.scss',
})

/**
 * Class representing a sign-up success dialog.
 */
export class SignUpSuccessDialog {
  @Input() zoomOutActive: boolean = true;
  @Output('close') close = new EventEmitter();

  /**
   * Stop an event.
   * @param event - The event to be stopped.
   */
  onEventStop(event: Event) {
    event.stopPropagation();
  }

  /**
   * Close a dialog on click.
   */
  onClose() {
    this.close.emit();
  }
}
