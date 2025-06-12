import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-sign-up',
  imports: [Header, Footer],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {}
