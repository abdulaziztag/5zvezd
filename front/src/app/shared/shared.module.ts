import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from "./modules/material/material.module";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {MainRoutingModule} from "../pages/main/main-routing.module";
import {DrawerComponent} from './components/drawer/drawer.component';
import {HeaderComponent} from './components/header/header.component';
import { DrawerListComponent } from './components/drawer-list/drawer-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule,
  ],
  declarations: [
    ErrorPageComponent,
    DrawerComponent,
    HeaderComponent,
    DrawerListComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ErrorPageComponent,
    DrawerComponent,
    HeaderComponent
  ]
})
export class SharedModule {
}
