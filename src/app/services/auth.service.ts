import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

// Services
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public msg: NzMessageService,
    public ngZone: NgZone // NgZone service to remove outside scope warning,
  ) {
    // Setting logged in user in localstorage else null
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  get userName(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.displayName;
  }

  get userEmail(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.email;
  }

  get isAuthenticated(): Observable<boolean> {
    const subject = new Subject<boolean>();

    this.afAuth.authState.subscribe(user => {
      if (user) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    });

    return subject.asObservable();
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Sign in with Github
  GithubAuth() {
    return this.AuthLogin(new auth.GithubAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then(() => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard/list']);
        });
    }).catch((error) => {
      this.msg.error(error);
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }
}
