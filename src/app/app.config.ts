import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ReactiveFormsModule,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(CheckboxModule),
    importProvidersFrom(TableModule),
    importProvidersFrom(BrowserAnimationsModule),
  ]
};
