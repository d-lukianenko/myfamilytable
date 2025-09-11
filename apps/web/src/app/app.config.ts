import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    importProvidersFrom(AppRoutingModule),
  ],
};
