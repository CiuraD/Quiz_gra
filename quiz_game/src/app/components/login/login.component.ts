import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { ApiConnectionService } from '../../service/api-connection.service';

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
    private ApiConnection: ApiConnectionService,

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  handleSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.ApiConnection.login(email!, password!).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('authToken', response.jwtToken);
          localStorage.setItem('login', response.username)
          console.log('Zapisane authToken:', localStorage.getItem('authToken'));
          console.log('Zapisane login:', localStorage.getItem('login'));
          this.router.navigate(['/menu']);
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
