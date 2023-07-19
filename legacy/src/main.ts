import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './ngrx/state';
import { provideRouter, Routes } from '@angular/router';
import { metaReducers } from './ngrx/reducers';

const routes: Routes = [];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideStore(reducers, { metaReducers}),
    provideStoreDevtools(),
    importProvidersFrom(HttpClientModule),
  ],
}).catch(console.error);
