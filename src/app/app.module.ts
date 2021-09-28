import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { NetworkService } from './service/network.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {NeedLoginGuard} from "./guard/need-login.guard";
import {NotLoginGuard} from "./guard/not-login.guard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
  ],
  providers: [
    CookieService,
    AuthService,
    NetworkService,
    NeedLoginGuard,
    NotLoginGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
