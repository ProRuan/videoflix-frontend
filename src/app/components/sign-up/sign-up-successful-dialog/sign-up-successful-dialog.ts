import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-successful-dialog',
  imports: [],
  templateUrl: './sign-up-successful-dialog.html',
  styleUrl: './sign-up-successful-dialog.scss',
})
export class SignUpSuccessfulDialog {
  @Output('close') close = new EventEmitter();

  onEventStop(event: Event) {
    event.stopPropagation();
  }

  onClose() {
    this.close.emit();
  }
}
