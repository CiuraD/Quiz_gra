import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  public countScore(level: number): void {
    
    let oldScore = localStorage.getItem('Score');
    let score = oldScore ? parseInt(oldScore, 10) : 0; 
    let newScore = score + level * 10; 
    
    localStorage.setItem('Score', newScore.toString()); 
    console.log('Score: ', localStorage.getItem('Score'));
  }
  public initializeHints(): void {
    localStorage.setItem('5050', 'true');
    localStorage.setItem('Audience', 'true');
    localStorage.setItem('Phone', 'true');
  }
  public Used5050(): void {
    localStorage.setItem('5050', false.toString());
  }
  public UsedAudience(): void {
    localStorage.setItem('Audience', false.toString());
  }
  public UsedPhone(): void {
    localStorage.setItem('Phone', false.toString());
  }
}
