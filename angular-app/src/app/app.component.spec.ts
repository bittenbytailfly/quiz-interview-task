import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from 'src/app/app.module';
import { HomeComponent } from 'src/app/home/home.component';
import { AppRoutingModule, routes } from './/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        AddQuestionsComponent,
        TakeQuizComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Quiz Generator'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Quiz Generator');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Quiz Generator');
  }));
});
