import { Component, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';

import { filter, map } from 'rxjs';

import { SuccessDialog } from '@shared/components/dialogs';
import { DialogIds } from '@shared/constants';
import { DialogManager } from '@shared/services';

import { CoreFooter, CoreHeader } from './components';

/**
 * Class representing a core layout component.
 */
@Component({
  selector: 'app-core-layout',
  imports: [CoreFooter, CoreHeader, RouterOutlet, SuccessDialog],
  templateUrl: './core-layout.html',
  styleUrl: './core-layout.scss',
  host: {
    '[class]': 'theme()',
  },
})
export class CoreLayout {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialogs = inject(DialogManager);

  theme = signal('');

  /**
   * Creates a core layout component.
   */
  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.findDeepestChild(this.route)),
        map((route) => route.snapshot.data['theme'] as string)
      )
      .subscribe((theme) => this.theme.set(theme));
  }

  /**
   * Find the deepest child of an activated route.
   * @param route - The activated route.
   * @returns The deepest child of the activated route.
   */
  private findDeepestChild(route: ActivatedRoute): ActivatedRoute {
    return route.firstChild ? this.findDeepestChild(route.firstChild) : route;
  }

  /**
   * Check if a success dialog is open.
   * @returns True if a success dialog is open, otherwise false.
   */
  isDialogOpen() {
    return this.dialogs.isOpen(DialogIds.Success);
  }
}
