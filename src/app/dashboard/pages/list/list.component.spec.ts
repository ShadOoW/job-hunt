import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { of } from 'rxjs';
import { DocumentSnapshot, Action } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardListComponent } from './list.component';
import { NzIconTestModule } from './../../../tests/nz-icon-test.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import { AuthService } from './../../../services/auth.service';
import { JobsService } from './../../../services/jobs.service';

class MockAuthService {
  get userEmail() {
    return 'shadoow.ma@gmail.com';
  }
}

class MockJobsService {
  listByAuthor(author) {
    return of({
      payload: {
        get: (path) => path
      },
    } as Action<DocumentSnapshot<unknown>>);
  }
}

describe('DashboardListComponent', () => {
  let component: DashboardListComponent;
  let fixture: ComponentFixture<DashboardListComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgZorroAntdModule,
        RouterTestingModule.withRoutes([]),
        NzIconTestModule,
        BrowserAnimationsModule,
      ],
      declarations: [ DashboardListComponent ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: JobsService, useClass: MockJobsService},
        { provide: NZ_I18N, useValue: en_US },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));
});
