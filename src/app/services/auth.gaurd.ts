import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, of, switchMap, tap } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    switchMap((isLoggedIn) => {
      if (isLoggedIn) {
        return of(true);
      } else {
        return auth.loginWithPopup().pipe(
          tap(() => {
            router.navigateByUrl(state.url);
          }),
          switchMap(() => auth.isAuthenticated$)
        );
      }
    })
  );
};
