import { Injectable } from '@angular/core';
import { Question } from './question';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const serviceUrl = "http://localhost:55261/api/quizquestion";

@Injectable({
  providedIn: 'root'
})

export class QuizQuestionService {

  constructor(private _http: HttpClient) { }

  getRandomQuestion() : Observable<Question> {
    return this._http.get<Question>(serviceUrl);
  }

  addQuestion(question: Question) : Observable<Question> {
    return this._http.post<Question>(serviceUrl, question);
  }
}