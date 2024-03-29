import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NzMessageService } from 'ng-zorro-antd/message';

describe('AuthService', () => {
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

  const mesgStub: any = {
    error(message) {
      return message;
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: AngularFireAuth, useValue: authStub},
        {provide: AngularFirestore},
        {provide: NzMessageService, useValue: mesgStub},
        AuthService
      ]
    });
    authStub.authState = of(null);
  });

  it('should be created', inject([ AuthService ], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('GoogleAuth should call signInWithPopup', inject([AuthService], (service: AuthService) => {
    const mock = TestBed.get(AngularFireAuth);
    const spy = spyOn(authStub.auth, 'signInWithPopup').and.callThrough();
    mock.auth = authStub.auth;

    service.GoogleAuth();

    expect(spy).toHaveBeenCalled();
  }));
});
