import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../../service/api-connection.service';

@Component({
  selector: 'app-endgamescreen',
  imports: [],
  templateUrl: './endgamescreen.component.html',
  styleUrl: './endgamescreen.component.css'
})
export class EndgamescreenComponent {
  score: number = 0;
  username: string = 'username';
  constructor(
    private router: Router,
    private ApiConnection: ApiConnectionService

  ) { }

  ngOnInit(): void {
    const savedScore = localStorage.getItem('Score');
    this.score = savedScore ? parseInt(savedScore, 10) : 0;
    this.username = localStorage.getItem('login') || 'username';
    this.ApiConnection.sendScore().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error(error)
    });
  }
  navigateToMenu() {
    this.router.navigate([`/menu`]);
  }
  navigateToLogin() {
    this.router.navigate([`/login`]);
  }
}
