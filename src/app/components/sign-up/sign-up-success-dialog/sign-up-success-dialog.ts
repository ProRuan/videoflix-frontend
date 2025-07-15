import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-success-dialog',
  imports: [],
  templateUrl: './sign-up-success-dialog.html',
  styleUrl: './sign-up-success-dialog.scss',
})
export class SignUpSuccessDialog {
  @Input() zoomOut: boolean = true;
  @Output('close') close = new EventEmitter();

  onEventStop(event: Event) {
    event.stopPropagation();
  }

  onClose() {
    this.close.emit();
  }
}
