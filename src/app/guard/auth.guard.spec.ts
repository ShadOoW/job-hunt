import { Observable, of } from 'rxjs';

import { AuthGuard } from './auth.guard';

class MockRouter {
  navigate(path) { return path; }
}

describe('AuthGuard', () => {
  let router;
  let authGuard;
  let authService;

  beforeEach(() => {
    router = new MockRouter();
  });

  it('should return true for a logged in user', () => {
    authService = new (class {
      get isAuthenticated(): Observable<boolean> {
        return of(true);
      }
     })();

    authGuard = new AuthGuard(authService, router);
    authGuard.canActivate().subscribe(result => expect(result).toEqual(true));
  });

  it('should redirect to home page for a logged out user', () => {
    authService = new (class {
      get isAuthenticated(): Observable<boolean> {
        return of(false);
      }
     })();

    const navigateSpy = spyOn(router, 'navigate');
    authGuard = new AuthGuard(authService, router);
    authGuard.canActivate().subscribe(() => {
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
  });
});
