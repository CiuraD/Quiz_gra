import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../interface/question';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectionService {
  private apiUrl = 'http://localhost:8282/api';

  constructor(private http: HttpClient) {}

  getQuestion(questionLevel: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/question${questionLevel}`);
  }

  getScoreboard(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/score/top}`); 
  }

  login(email: string, password: string): Observable<any> {
    const loginDTO = { mail: email, password: password };
    return this.http.post(`${this.apiUrl}/user/login`, loginDTO);
  }

  register(nickname: string, email: string, password: string, confirmPassword: string): Observable<any> {
    const registerDTO = { 
      username: nickname, 
      email: email, 
      password: password, 
      confirmPassword: confirmPassword 
    };
    return this.http.post(`${this.apiUrl}/user/register`, registerDTO);
  }
}
