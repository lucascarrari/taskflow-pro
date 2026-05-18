import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { DEMO_USER } from '../mocks/auth.mock';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'taskflow_token';

  private readonly platformId = inject(PLATFORM_ID);

  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

login(email: string, password: string): boolean {
  const isValidCredentials =
    email === DEMO_USER.email && password === DEMO_USER.password;

  if (!isValidCredentials) {
    this.isAuthenticatedSubject.next(false);
    return false;
  }

  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem(this.tokenKey, 'fake-jwt-token');
  }

  this.isAuthenticatedSubject.next(true);

  return true;
}
  logout(): void {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
    }

    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {

    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.tokenKey);
    }

    return false;
  }
}