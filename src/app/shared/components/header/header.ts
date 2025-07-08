import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private router: Router = inject(Router);

  @Input() notLogIn: boolean = true;

  isStartsite() {
    return this.router.url === '/';
  }

  onHome() {
    this.router.navigateByUrl('');
  }

  onNavigate() {
    this.router.navigateByUrl('log-in');
  }
}
