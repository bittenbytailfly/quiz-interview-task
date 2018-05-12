import { Injectable } from '@angular/core';
import { Question } from './question';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const serviceUrl = "http://localhost:55261";

@Injectable({
  providedIn: 'root'
})

export class QuizQuestionService {

  constructor(private _http: HttpClient) { }

  getRandomQuestion() : Observable<Question> {
    return this._http.get<Question>(serviceUrl);
  }

  addQuestion(question: Question) : Boolean {
    return null;
  }
}