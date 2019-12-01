import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardPostComponent } from './post.component';
import { DocumentSnapshot, Action } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { NzIconTestModule } from './../../../tests/nz-icon-test.module';

// Services
import { AuthService } from './../../../services/auth.service';
import { JobsService } from './../../../services/jobs.service';

class MockAuthService {
  get userEmail() {
    return 'shadoow.ma@gmail.com';
  }
}

class MockJobsService {
  get(id) {
    return of({
      payload: {
        get: (path) => path
      },
    } as Action<DocumentSnapshot<unknown>>);
  }
}

describe('DashboardPostComponent', () => {
  let component: DashboardPostComponent;
  let fixture: ComponentFixture<DashboardPostComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        RouterTestingModule.withRoutes([]),
        NzIconTestModule,
      ],
      declarations: [ DashboardPostComponent ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: JobsService, useClass: MockJobsService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should compile', () => () => {
    expect(component).toBeTruthy();
  });
});
