import { TestBed, async } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'loginapp'`, () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('loginapp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('loginapp app is running!');
  });
});
