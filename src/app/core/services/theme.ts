import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly storageKey = 'taskflow_theme';

  private isDarkMode = false;

  loadTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const savedTheme = localStorage.getItem(this.storageKey);

    this.isDarkMode = savedTheme === 'dark';

    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        this.storageKey,
        this.isDarkMode ? 'dark' : 'light'
      );
    }

    this.applyTheme();
  }

  private applyTheme(): void {
    const body = this.document.body;

    if (this.isDarkMode) {
      body.classList.add('dark-theme');
      return;
    }

    body.classList.remove('dark-theme');
  }
}