import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-log-in',
  imports: [Header, Footer],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {}
