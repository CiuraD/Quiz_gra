import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiConnectionService } from '../../service/api-connection.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  standalone: true,
  providers: [ApiConnectionService, HttpClient],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  registerForm: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ApiConnection: ApiConnectionService,
  ) {
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
          this.verifyCode(email);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          alert('Rejestacja nie powiodła się. Błąd:' + err.toString());
        }
      });
    }
  }
  navigateToLogin() {
    this.router.navigate([`/login`]);
  }

  handleActivateAccount(): void {
    const email = prompt('Podaj adres e-mail użyty podczas rejestracji:');
    if (email) {
      this.verifyCode(email);
    } else {
      alert('Nie podano adresu e-mail.');
    }
  }
  verifyCode(email: string): void {
    const verificationCode = prompt('Wprowadź kod weryfikacyjny wysłany na Twój e-mail:');

    if (verificationCode) {
      this.ApiConnection.verifyEmailCode(verificationCode, email).subscribe({
        next: () => {
          alert('Kod weryfikacyjny został poprawnie zweryfikowany!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Weryfikacja kodu nie powiodła się:', err);
          alert('Weryfikacja kodu nie powiodła się. Spróbuj ponownie.');
        }
      });
    } else {
      alert('Nie podano kodu weryfikacyjnego.');
    }
  }

  handleResendCode() {
    const email = prompt('Podaj adres e-mail użyty podczas rejestracji:');
    if (email) {
      this.ApiConnection.resendVerificationCode(email).subscribe({
        next: () => {
          alert('Kod weryfikacyjny został ponownie wysłany na Twój adres e-mail.');
        },
        error: (err) => {
          console.error('Wysłanie kodu weryfikacyjnego nie powiodło się:', err);
          alert('Wysłanie kodu weryfikacyjnego nie powiodło się. Spróbuj ponownie.');
        }
      });
    } else {
      alert('Nie podano adresu e-mail.');
    }
  }
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
