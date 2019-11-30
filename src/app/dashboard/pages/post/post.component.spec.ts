import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardPostComponent } from './post.component';

describe('LoginComponent', () => {
  let component: DashboardPostComponent;
  let fixture: ComponentFixture<DashboardPostComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
