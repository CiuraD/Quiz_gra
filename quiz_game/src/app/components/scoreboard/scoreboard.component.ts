import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../../service/api-connection.service';

@Component({
  selector: 'app-scoreboard',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  topScore: { username: string, score: number } = { username: '', score: 0 };
  scoreboard: { username: string, score: number }[] = [];

  constructor(
    private router: Router,
    private apiConnectionService: ApiConnectionService
  ) { }

  ngOnInit(): void {
    this.fetchScoreboard();
  }

  fetchScoreboard(): void {
    this.apiConnectionService.getScoreboard().subscribe({
      next: (response) => {
        this.scoreboard = response.sort((a, b) => b.score - a.score);

        this.scoreboard = this.scoreboard.slice(0, 10);

        console.log('Scoreboard:', this.scoreboard);
      },
      error: (error) => {
        console.error('Błąd pobierania wyników:', error);
      }
    });
  }
  navigateToMenu() {
    this.router.navigate([`/menu`]);
  }

  navigateToLogin() {
    this.router.navigate([`/login`]);
  }

}
