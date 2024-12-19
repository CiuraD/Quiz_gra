import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../interface/question';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectionService {
  private apiUrl = 'http://localhost:8282/api/question';
  private getTopScoreUrl = 'http://localhost:8282/api/score/top';

  constructor(private http: HttpClient) {}

  getQuestion(questionLevel: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${questionLevel}`);
  }

  getScoreboard(): Observable<any[]> {
    return this.http.get<any[]>(this.getTopScoreUrl); 
  }
}
