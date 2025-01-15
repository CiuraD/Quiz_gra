import { Injectable,  } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../interface/question';

@Injectable({
  providedIn: 'root',
})

export class ApiConnectionService {
  private apiUrl = 'http://localhost:8282/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
  }

  getQuestion(questionLevel: number): Observable<Question> {
    const headers = this.getAuthHeaders();
    return this.http.get<Question>(`${this.apiUrl}/question/${questionLevel}`, { headers });
  }

  getScoreboard(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/score/top`, { headers });
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
    console.log('registerDTO:', registerDTO);
    return this.http.post(`${this.apiUrl}/user/register`, registerDTO);
  }
  sendScore(): Observable<any> {
    const headers = this.getAuthHeaders();
    const ScoreDTO = {
      username: localStorage.getItem('login'),
      score: localStorage.getItem('Score')
    }

    console.log('this.apiUrl/score:', `${this.apiUrl}/score`,  ScoreDTO , { headers });
    return this.http.post(`${this.apiUrl}/score`, ScoreDTO , { headers });
  }
  verifyEmailCode(code: string, email: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const verificationDTO = { code };
    return this.http.post(`${this.apiUrl}/user/activate/${email}`, verificationDTO, { headers });
  }
}
