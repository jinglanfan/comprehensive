import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementComponent } from './management.component';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ManagementComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dashboard'`, () => {
    const fixture = TestBed.createComponent(ManagementComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('dashboard');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ManagementComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('dashboard app is running!');
  });
});

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
