import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-success-dialog',
  imports: [],
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
