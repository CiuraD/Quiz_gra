import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../../service/api-connection.service';
import { HttpClient } from '@angular/common/http';

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
    private ApiConnection: ApiConnectionService,
  ){
    this.registerForm = this.fb.group(
      {
        nickname: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '', 
          [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}')]
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator.bind(this) }
    );
  }
  handleSubmit(): void {
    if (this.registerForm.valid) {
      const { nickname, email, password, confirmPassword } = this.registerForm.value;
      this.ApiConnection.register(nickname!, email!, password!, confirmPassword!).subscribe({
        next: () => {
          console.log('Registration successful');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          // Obsłuż błędy
        }
      });
    }
  }
  navigateToLogin() {
    this.router.navigate([`/login`]);
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
