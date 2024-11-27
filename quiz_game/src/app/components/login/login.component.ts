import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  handleSubmit(): void {
    console.log('Form submitted'); // Dodaj logowanie
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login Data:', { email, password }); // Dodaj logowanie
      this.router.navigate(['/menu']);
    }
    else {
      //TUTAJ DODAJ WYŚWIETLANIE BŁĘDÓW NA EKRANIE
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
