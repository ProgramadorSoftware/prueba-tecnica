import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('registered', 'true');
      this.authenticated = true;
      return true;
    }
    return false;
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('registered');
    this.router.navigate(['/login']);
  }

  registered(): boolean {
    return this.authenticated || localStorage.getItem('registered') === 'true';
  }
}

