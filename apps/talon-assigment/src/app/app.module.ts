import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent],
})
export class AppModule {}
