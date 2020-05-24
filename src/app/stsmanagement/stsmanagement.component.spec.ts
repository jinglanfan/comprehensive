import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StsmanagementComponent } from './stsmanagement.component';

describe('StsmanagementComponent', () => {
  let component: StsmanagementComponent;
  let fixture: ComponentFixture<StsmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StsmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StsmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
