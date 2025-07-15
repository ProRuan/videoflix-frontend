import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-successful-dialog',
  imports: [],
  templateUrl: './sign-up-successful-dialog.html',
  styleUrl: './sign-up-successful-dialog.scss',
})
export class SignUpSuccessfulDialog {
  @Input() zoomOut: boolean = true;
  @Output('close') close = new EventEmitter();

  onEventStop(event: Event) {
    event.stopPropagation();
  }

  onClose() {
    this.close.emit();
  }
}
