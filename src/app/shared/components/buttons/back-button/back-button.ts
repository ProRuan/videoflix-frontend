import { Component } from '@angular/core';

/**
 * Class representing a back button component.
 */
@Component({
  selector: 'app-back-button',
  imports: [],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {
  /**
   * Step back in history on click.
   */
  onBack() {
    history.back();
  }
}
