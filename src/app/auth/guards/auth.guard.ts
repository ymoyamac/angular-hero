import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

type CanResolve = Observable<boolean> | Promise<boolean> | boolean;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanResolve {
    // if (this.authService.userAuth.id) {
    //   return true;
    // }
    // return false;
    return this.authService.verifyAuthenthication()
      .pipe(tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login'])
        }
      }));

  }

  canLoad(route: Route, segments: UrlSegment[]): CanResolve {
    return this.authService.verifyAuthenthication()
      .pipe(tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login'])
        }
      }));
    // if (this.authService.userAuth.id) {
    //   return true;
    // }
    // return false;
  }
}
