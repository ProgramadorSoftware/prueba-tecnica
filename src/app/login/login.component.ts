import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

//accessories
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CardModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), this.specialChars()]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.registered()) {
      this.router.navigate(['/proyecto']);
    }
  }

  submit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const LoggedIn = this.authService.login(username, password);
      if (LoggedIn) {
        this.router.navigate(['/proyecto']);
      } else {
        this.errorMessage = 'Credenciales inválidas';
      }
    }
  }

  specialChars(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasSpecialChars = /[^a-zA-Z0-9]/.test(control.value);
      return hasSpecialChars ? { specialChars: true } : null;
    };
  }

  // Accesores para obtener los errores de los controles
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
