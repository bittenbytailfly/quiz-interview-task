import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { AppRoutingModule } from './app-routing.module';
import { QuizQuestionService } from './quiz-question.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddQuestionsComponent,
    TakeQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [QuizQuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
