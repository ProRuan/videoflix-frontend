import { Component } from '@angular/core';

import { TopButton } from '@shared/components/buttons';
import { LinkHeader } from '@shared/components/headers';

/**
 * Class representing a privacy policy component.
 */
@Component({
  selector: 'app-privacy-policy',
  imports: [LinkHeader, TopButton],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {}
