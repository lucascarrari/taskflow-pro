import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'taskflow_token';

  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(email: string, password: string): boolean {
    if (email && password.length >= 6) {
      localStorage.setItem(this.tokenKey, 'fake-jwt-token');
      this.isAuthenticatedSubject.next(true);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}