import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated.pipe(
      map(e => {
        if (e) {
          return true;
        } else {
          window.alert('Access Denied, Login is Required to Access This Page!');
          this.router.navigate(['/dashboard/login']);
        }
      }),
      catchError((err) => {
        this.router.navigate(['/dashboard/login']);
        return of(false);
      })
    );
  }
}
