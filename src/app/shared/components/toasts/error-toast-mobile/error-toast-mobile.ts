import { Component } from '@angular/core';

import { Button } from '@shared/components/buttons';
import { ErrorToastBase } from '@shared/directives';

/**
 * Class representing an error toast component for mobile devices.
 * @extends ErrorToastBase
 */
@Component({
  selector: 'app-error-toast-mobile',
  imports: [Button],
  templateUrl: './error-toast-mobile.html',
  styleUrl: './error-toast-mobile.scss',
})
export class ErrorToastMobile extends ErrorToastBase {}
