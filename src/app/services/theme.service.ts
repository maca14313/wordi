// src/app/theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /*
  private darkModeKey = 'dark-mode';

  constructor() {
    this.loadTheme();
  }

  toggleDarkMode() {
    if (this.isLocalStorageAvailable()) {
      document.documentElement.classList.toggle('dark');
      this.storeTheme(document.documentElement.classList.contains('dark'));
    }
  }

  private storeTheme(isDarkMode: boolean) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.darkModeKey, isDarkMode ? 'true' : 'false');
    }
  }

  private loadTheme() {
    if (this.isLocalStorageAvailable()) {
      const isDarkMode = localStorage.getItem(this.darkModeKey) === 'true';
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      }
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  */
}
