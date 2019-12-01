import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { NzIconTestModule } from './tests/nz-icon-test.module';
import { AppComponent } from './app.component';

// Services
import { AuthService } from './services/auth.service';

class MockAuthService {
  get isAuthenticated(): Observable<boolean> {
    return of(true);
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgZorroAntdModule,
        RouterTestingModule.withRoutes([]),
        NzIconTestModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.sidebar-logo h1').textContent).toContain('Job Hunt');
  });
});
