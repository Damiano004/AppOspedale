import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
registerLocaleData(localeIt);
