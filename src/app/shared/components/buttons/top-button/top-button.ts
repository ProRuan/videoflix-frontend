import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';

/**
 * Class representing a top button component.
 */
@Component({
  selector: 'app-top-button',
  imports: [],
  templateUrl: './top-button.html',
  styleUrl: './top-button.scss',
})
export class TopButton {
  scroller = inject(ViewportScroller);

  /**
   * Scroll to the top on click.
   */
  onTop() {
    this.scroller.scrollToPosition([0, 0], { behavior: 'smooth' });
  }
}
