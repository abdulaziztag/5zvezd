import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {ErrorPageComponent} from "../../shared/components/error-page/error-page.component";
import {RegistrationComponent} from "./registration/registration.component";

const routes: Routes = [
  {
    path: 'login',
    title: 'Sign In',
    component: LoginComponent
  },
  {
    path: 'confirmation/:code',
    title: 'Confirmation',
    component: ConfirmationComponent
  },
  {
    path: 'registration',
    title: 'Sign Up',
    component: RegistrationComponent
  },
  {
    path: '**',
    title: 'Not found',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
