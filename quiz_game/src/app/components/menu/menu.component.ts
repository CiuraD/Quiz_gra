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
  ) { }

  navigateToLogin() {
    this.router.navigate([`/login`]);
  }
  navigateTo(screen: string): void {
    console.log("Naviate to: " + screen)
    if(screen=='/login'){
      console.log("Dodaj restart widoków i danych w formularzu a następnie przekieruj na login")
    }
    this.router.navigate([screen]);
  }
}
