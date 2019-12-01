import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: DashboardLoginComponent;
  let fixture: ComponentFixture<DashboardLoginComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
