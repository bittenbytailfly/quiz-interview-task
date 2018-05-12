import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionsComponent } from './add-questions.component';
import { QuizQuestionService } from '../quiz-question.service';
import { FormsModule } from '@angular/forms';

class MockQuestionService {
  addQuestion() : Boolean {
    console.log('called');
    return true;
  }
}

describe('AddQuestionsComponent', () => {
  let component: AddQuestionsComponent;
  let fixture: ComponentFixture<AddQuestionsComponent>;

  const mockQuestionService = new MockQuestionService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionsComponent ],
      providers: [
        { provide: QuizQuestionService, useValue: mockQuestionService }
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear question and answer fields on saving question', () => {
    const compiled = fixture.debugElement.nativeElement;
    const questionInput = compiled.querySelector('#question');
    const answerInput = compiled.querySelector('#answer')

    // Set values to something
    questionInput.value = 'Question';
    answerInput.value = 'Answer';

    // Click the button
    compiled.querySelector('#save-question').click();
    fixture.detectChanges();

    // Ensure they are emptied
    expect(component.question.question).toBe('');
    expect(component.question.answer).toBe('');
  });

  it('should call save question method on service when "save question" button clicked', () => {
    const compiled = fixture.debugElement.nativeElement;
    const questionInput = compiled.querySelector('#question');
    const answerInput = compiled.querySelector('#answer')
    spyOn(mockQuestionService, 'addQuestion');

    // Set values to something
    questionInput.value = 'Question';
    answerInput.value = 'Answer';

    // Click the button
    compiled.querySelector('#save-question').click();
    fixture.detectChanges();

    expect(mockQuestionService.addQuestion).toHaveBeenCalledTimes(1);
  });

  it('should display "Question successfully added" when question saved', () => {
    const compiled = fixture.debugElement.nativeElement;
    let successMessage = compiled.querySelector('#success-message p');

    // Make sure it is not visible to begin with
    expect(successMessage).toBeNull();

    // Click the button
    compiled.querySelector('#save-question').click();
    fixture.detectChanges();

    // Check if it now appears
    successMessage = compiled.querySelector('#success-message p');
    expect(successMessage).toBeTruthy();
    expect(successMessage.textContent).toEqual('Question successfully added')
  });

});