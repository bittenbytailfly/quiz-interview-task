import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-questions', component: AddQuestionsComponent },
  { path: 'take-quiz', component: TakeQuizComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
