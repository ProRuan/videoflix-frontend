import { Component } from '@angular/core';
import { LinkHeader } from '@shared/components/headers/link-header/link-header';

@Component({
  selector: 'app-privacy-policy',
  imports: [LinkHeader],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {}
