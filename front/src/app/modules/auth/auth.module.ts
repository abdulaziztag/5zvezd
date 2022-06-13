import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {MatInputModule} from "@angular/material/input";
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {MatButtonModule} from "@angular/material/button";
import { RegistrationComponent } from './registration/registration.component';
import {Title} from "@angular/platform-browser";


@NgModule({
  declarations: [
    LoginComponent,
    ConfirmationComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    Title
  ]
})
export class AuthModule {
}
