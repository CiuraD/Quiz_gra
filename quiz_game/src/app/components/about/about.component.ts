import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
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
