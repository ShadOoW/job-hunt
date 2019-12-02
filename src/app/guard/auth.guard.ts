import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Services
import { AuthService } from './../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    public msg: NzMessageService
  ) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      map(e => {
        if (e) {
          return true;
        } else {
          this.msg.error('Access Denied, Login is Required to Access This Page!');
          this.router.navigate(['/']);
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
