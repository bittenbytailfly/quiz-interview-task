import { TestBed, inject } from '@angular/core/testing';

import { QuizQuestionService } from './quiz-question.service';

describe('QuizQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizQuestionService]
    });
  });

  it('should be created', inject([QuizQuestionService], (service: QuizQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
