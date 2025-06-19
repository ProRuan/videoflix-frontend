import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-startsite',
  imports: [Header, Footer],
  templateUrl: './startsite.html',
  styleUrl: './startsite.scss',
})
export class Startsite {
  // create EmailInputComponent ...
  // replace hex with rgba values (from Figma) ...
  // global button and input font-family and font (settings) ...
  // check image (bg) size ... !
  // center elements by parents (only containers with simple elements) ...
  //   --> startsite, log-in, ...
  // BACKEND
  // replace username with email ... !
}
