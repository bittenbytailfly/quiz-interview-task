import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QuizQuestionService } from '../quiz-question.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})

export class TakeQuizComponent implements OnInit {
  question: Question;
  isAnswerRevealed: boolean;

  constructor(private _questionService : QuizQuestionService) {
    this.isAnswerRevealed = false;
   }

  ngOnInit() : void {
    this.showRandomQuestion();
  }

  revealAnswer() : void {
    this.isAnswerRevealed = true;
  }

  showRandomQuestion() : void {
    this.question = this._questionService.getRandomQuestion();
    this.isAnswerRevealed = false;
  }
}
