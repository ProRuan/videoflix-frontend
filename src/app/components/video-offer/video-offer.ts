import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-video-offer',
  imports: [Header, Footer],
  templateUrl: './video-offer.html',
  styleUrl: './video-offer.scss',
})
export class VideoOffer {}
