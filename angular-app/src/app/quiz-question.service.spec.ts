import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { QuizQuestionService } from './quiz-question.service';

describe('QuizQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizQuestionService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([QuizQuestionService], (service: QuizQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
