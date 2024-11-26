import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true
})
export class MenuComponent {
  constructor(
    private router: Router,
  ) {}

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
