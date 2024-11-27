import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scoreboard',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  scoreboard = [
    { nick: 'Player1', score: 1200 },
    { nick: 'Player2', score: 1150 },
    { nick: 'Player3', score: 1100 },
    { nick: 'Player4', score: 1050 },
    { nick: 'Player5', score: 1000 },
    { nick: 'Player6', score: 950 },
    { nick: 'Player7', score: 900 },
    { nick: 'Player8', score: 850 },
    { nick: 'Player9', score: 800 },
    { nick: 'Player10', score: 750 }
  ];
  constructor(
    private router: Router,
  ) {

  }

  navigateToMenu() {
    this.router.navigate([`/menu`]);
  }
  navigateToLogin() {
    this.router.navigate([`/login`]);
  }
}
