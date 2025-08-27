import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const videoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // clean code ...

  const id = route.paramMap.get('id') ?? '0';
  if (isNaN(Number(id))) return router.createUrlTree(['/page-not-found']);
  return true;
};
