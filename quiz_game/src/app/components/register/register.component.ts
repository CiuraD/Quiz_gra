import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
  ){
    this.registerForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}')]],
      confirmPassword: ['', Validators.required],
      

    })
  }
  handleSubmit(): void {
    console.log('Form submitted'); // Dodaj logowanie
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      console.log('Login Data:', { email, password }); // Dodaj logowanie
      this.router.navigate(['/login']);
    }
    else {
      //TUTAJ DODAJ WYŚWIETLANIE BŁĘDÓW NA EKRANIE
    }
  }
  navigateToLogin() {
    this.router.navigate([`/login`]);
  }
}
