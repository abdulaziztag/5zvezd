import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from "./layouts/auth/auth.component";
import { MainComponent } from "./layouts/main/main.component";
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
