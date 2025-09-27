import { Component } from '@angular/core';

import { LinkHeader } from '@shared/components/headers';

/**
 * Class representing a privacy policy component.
 */
@Component({
  selector: 'app-privacy-policy',
  imports: [LinkHeader],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {}
