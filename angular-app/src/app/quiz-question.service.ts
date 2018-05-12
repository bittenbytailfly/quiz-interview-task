import { Injectable } from '@angular/core';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionService {

  constructor() { }

  getRandomQuestion() : Question {
    return null;
  }

  addQuestion(question: Question) : Boolean {
    return null;
  }
}