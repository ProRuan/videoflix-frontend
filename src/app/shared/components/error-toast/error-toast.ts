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
  @Input() hidden: boolean = true;

  @Output('hide') toastHide = new EventEmitter();

  /**
   * Check an error toast for the shown state.
   * @returns A boolean value.
   */
  isShown() {
    return !this.hidden;
  }

  /**
   * Hide an error toast on click.
   */
  onHide() {
    this.toastHide.emit();
  }
}
