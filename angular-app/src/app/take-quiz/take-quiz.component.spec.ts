import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TakeQuizComponent } from './take-quiz.component';
import { Question } from '../question';
import { QuizQuestionService } from '../quiz-question.service';

class MockQuestionService {
  getRandomQuestion() : Question {
    let question = new Question();
    question.question = "Q";
    question.answer = "A";
    return question;
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
});
