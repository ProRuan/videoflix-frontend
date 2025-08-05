import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { Header, Footer } from '../components';

@Component({
  selector: 'app-core-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './core-layout.html',
  styleUrl: './core-layout.scss',
  host: {
    // whenever bgUrl changes, Angular will update the host's inline background-image
    // set background-position and so on ...
    '[style.backgroundImage]': `bgUrl ? bgUrl : ''`,
  },
})
export class CoreLayout {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  bgUrl: string = '';

  constructor() {
    this.router.events
      .pipe(
        filter((evt) => evt instanceof NavigationEnd),
        map(() => this.findDeepestChild(this.route)),
        map((route) => route.snapshot.data['bg'] as string),
        filter((bg) => !!bg)
      )
      .subscribe((bg) => {
        this.bgUrl = bg;
      });
  }

  private findDeepestChild(route: ActivatedRoute): ActivatedRoute {
    return route.firstChild ? this.findDeepestChild(route.firstChild) : route;
  }
}
