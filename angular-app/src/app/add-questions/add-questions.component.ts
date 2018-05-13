import { Component, OnInit, Input } from '@angular/core';
import { QuizQuestionService } from '../quiz-question.service';
import { Question } from '../question';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  @Input() question : Question;
  messageVisible: boolean;
  isButtonDisabled : boolean;
  message: string;

  constructor(private _questionService : QuizQuestionService) { }

  ngOnInit() {
    this.question = new Question();
  }

  addQuestion(): void {
    this.isButtonDisabled = true;
    this._questionService.addQuestion(this.question)
      .subscribe(
        success => {
          this.showMessage('Question successfully added');
          this.question = new Question();
          this.isButtonDisabled = false;
        },
        error => {
          this.showMessage('Failed to add question')
          this.isButtonDisabled = false;
        }
      );
  }

  showMessage(message: string) {
    this.messageVisible = true;
    this.message = message;
    setTimeout(() => this.hideMessage(), 3000);
  }

  hideMessage(): void {
    this.messageVisible = false;
  }

}
