import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme';
import {
  Bell,
  LogOut,
  LucideAngularModule,
  Moon,
  Search,
  User
} from 'lucide-angular';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly icons = {
    search: Search,
    bell: Bell,
    moon: Moon,
    user: User,
    logout: LogOut
  };

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private readonly themeService = inject(ThemeService);

  toggleTheme(): void {
  this.themeService.toggleTheme();
}
}