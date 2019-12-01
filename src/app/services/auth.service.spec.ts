import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
// import { environment } from '../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

// describe('AuthService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

//   it('should be created', () => {
//     const service: AuthService = TestBed.get(AuthService);
//     expect(service).toBeTruthy();
//   });
// });

// describe('AuthService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [AuthService]
//     });
//   });

//   it('should be created', inject([AuthService], (service: AuthService) => {
//     expect(service).toBeTruthy();
//   }));
// });

// describe('AuthService', () => {
//   // An anonymous user
//   const authState = {
//     displayName: null,
//     isAnonymous: true,
//     uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
//   };

//   const mockAngularFireAuth: any = {
//     auth: jasmine.createSpyObj('auth', {
//       'signInAnonymously': Promise.reject({
//         code: 'auth/operation-not-allowed'
//       }),
//       // 'signInWithPopup': Promise.reject(),
//       // 'signOut': Promise.reject()
//     }),
//     authState: Observable.of(authState)
//   };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         { provide: AngularFireAuth, useValue: mockAngularFireAuth },
//         { provide: AuthService, useClass: AuthService }
//       ]
//     });
//   });

//   it('should be created', inject([ AuthService ], (service: AuthService) => {
//     expect(service).toBeTruthy();
//   }));

//   describe('catastrophically fails', () => {
//     beforeEach(() => {
//       const spy = spyOn(mockAngularFireAuth, 'authState');

//       spy.and.returnValue(Observable.throw(new Error('Catastrophe')));
//     });

//     describe('AngularFireAuth.authState', () => {
//       it('should invoke it’s onError function', () => {
//         mockAngularFireAuth.authState.subscribe(null,
//           (error: Error) => {
//             expect(error).toEqual(new Error('Catastrophe'));
//           });
//       });
//     });
//   });
// });
describe('AuthService', () => {

  // const email: string = 'email';
  // const password: string = 'password';

  const authStub: any = {
    authState: {},
    auth: {
      signInWithEmailAndPassword() {
        return Promise.resolve();
      },
      GoogleAuthProvider() {
        return Promise.resolve();
      },
      signInWithPopup() {
        return Promise.resolve();
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: AngularFireAuth, useValue: authStub},
        {provide: AngularFirestore},
        AuthService
      ]
    });
    authStub.authState = of(null);
  });

  it('GoogleAuth should call GoogleAuthProvider', inject([AuthService], (service: AuthService) => {
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'signInWithPopup').and.callThrough();
    mock.auth = authStub.auth;

    service.GoogleAuth();

    expect(spy).toHaveBeenCalled();
  }));
});
