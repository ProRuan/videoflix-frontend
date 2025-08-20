import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tokenErrorData } from '@core/errors/constants';
import { PossibleTokenErrors } from '@core/errors/types';

/**
 * Class representing a token error component.
 */
@Component({
  selector: 'app-token-error',
  imports: [],
  templateUrl: './token-error.html',
  styleUrl: './token-error.scss',
})
export class TokenError {
  route: ActivatedRoute = inject(ActivatedRoute);

  title: WritableSignal<string> = signal('');
  message: WritableSignal<string> = signal('');

  /**
   * Initializes a token error component.
   */
  ngOnInit() {
    this.setErrorData();
  }

  /**
   * Set error title and message.
   */
  setErrorData() {
    this.route.data.subscribe((data) => {
      const key = data['error'] as PossibleTokenErrors;
      const error = tokenErrorData[key];
      this.title.set(error.title);
      this.message.set(error.message);
    });
  }
}
