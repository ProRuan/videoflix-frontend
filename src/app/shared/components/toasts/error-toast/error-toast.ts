import { Component } from '@angular/core';

import { Button } from '@shared/components/buttons';
import { ErrorToastBase } from '@shared/directives';

/**
 * Class representing an error toast component.
 * @extends ErrorToastBase
 */
@Component({
  selector: 'app-error-toast',
  imports: [Button],
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.scss',
})
export class ErrorToast extends ErrorToastBase {}
