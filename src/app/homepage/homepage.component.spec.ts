import { TestBed, async } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomepageComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomepageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pricing'`, () => {
    const fixture = TestBed.createComponent(HomepageComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pricing');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomepageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('pricing app is running!');
  });
});
