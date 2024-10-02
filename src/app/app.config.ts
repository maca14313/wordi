import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient} from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ThemeService } from './services/theme.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideHttpClient(),ThemeService, provideAnimationsAsync()]
};
