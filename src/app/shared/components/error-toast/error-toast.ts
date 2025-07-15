import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-toast',
  imports: [],
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.scss',
})

/**
 * Class representing an error toast component.
 */
export class ErrorToast {
  @Input() message: string = '';
  @Output() close = new EventEmitter();

  /**
   * Close an error toast on click.
   */
  onClose() {
    this.close.emit();
  }
}
