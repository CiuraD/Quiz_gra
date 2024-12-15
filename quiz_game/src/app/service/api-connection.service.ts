import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../interface/question';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectionService {
  private apiUrl = 'http://localhost:8282/api/question';

  constructor(private http: HttpClient) {}

  getQuestion(questionLevel: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${questionLevel}`);
  }
}
