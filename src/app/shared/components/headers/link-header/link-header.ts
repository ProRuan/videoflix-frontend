import { Component } from '@angular/core';

import { BackButton, HomeButton } from '@shared/components/buttons';

/**
 * Class representing a link header component.
 */
@Component({
  selector: 'app-link-header',
  imports: [BackButton, HomeButton],
  templateUrl: './link-header.html',
  styleUrl: './link-header.scss',
})
export class LinkHeader {}
