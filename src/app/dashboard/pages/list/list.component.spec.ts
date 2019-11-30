import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardListComponent } from './list.component';

describe('LoginComponent', () => {
  let component: DashboardListComponent;
  let fixture: ComponentFixture<DashboardListComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
