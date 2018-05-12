import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TakeQuizComponent } from './take-quiz.component';
import { Question } from '../question';
import { QuizQuestionService } from '../quiz-question.service';
import { Observable } from 'rxjs';

class MockQuestionService {
  getRandomQuestion() : Observable<Question> {
    let question = new Question();
    question.question = "Q";
    question.answer = "A";
    return Observable.create(o => o.next(question));
  }
}

describe('TakeQuizComponent', () => {
  let component: TakeQuizComponent;
  let fixture: ComponentFixture<TakeQuizComponent>;

  const mockQuestionService = new MockQuestionService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeQuizComponent ],
      providers: [
        { provide: QuizQuestionService, useValue: mockQuestionService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have answer hidden initially', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p.answer span').attributes.class).toBeUndefined();
  }));

  it('should have answer revealed after clicking "reveal answer"', () => {
    const compiled = fixture.debugElement.nativeElement;
    compiled.querySelector('#reveal-answer-button').click();
    expect(fixture.componentInstance.isAnswerRevealed).toBeTruthy();
    fixture.detectChanges();
    expect(compiled.querySelector('p.answer span').attributes.class.value).toEqual('show');
  });

  it('should correctly bind question and answer to the correct fields', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p.question').textContent).toEqual('Q');
    expect(compiled.querySelector('p.answer span').textContent).toEqual('A');
  });

  it ('should show relevant buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#reveal-answer-button')).toBeTruthy();
    expect(compiled.querySelector('#next-question-button')).toBeTruthy();
  });

  it ('should show another random question on clicking of "next question" button', () => {
    const compiled = fixture.debugElement.nativeElement;
    spyOn(mockQuestionService, 'getRandomQuestion');

    compiled.querySelector('#next-question-button').click();
    fixture.detectChanges();
    
    expect(mockQuestionService.getRandomQuestion).toHaveBeenCalled();
  });
});
