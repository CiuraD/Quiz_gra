import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamescreen',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './gamescreen.component.html',
  styleUrl: './gamescreen.component.css'
})
export class GamescreenComponent {
  hintPhone() {
    throw new Error('Method not implemented.');
  }
  hintAudience() {
    throw new Error('Method not implemented.');
  }
  hint5050() {
    throw new Error('Method not implemented.');
  }
  clickAnswerA() {
    throw new Error('Method not implemented.');
  }
  clickAnswerB() {
    throw new Error('Method not implemented.');
  }
  clickAnswerC() {
    throw new Error('Method not implemented.');
  }
  clickAnswerD() {
    throw new Error('Method not implemented.');
  }
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
