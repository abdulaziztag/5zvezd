import {InjectionToken, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthLayoutComponent} from "./pages/auth/layout/auth.component";
import {MainLayoutComponent} from "./pages/main/layout/main.component";
import {SharedModule} from "./shared/shared.module";
import {
  DrawerService,
  DrawerService1,
  DrawerServiceBase,
  DrawerServiceInterface
} from "./shared/services/drawer.service";

export interface ConfigInterface {
  textColor: 'blue' | 'green';
}
export const INIT_CONF = new InjectionToken<number>('Init config');
export const DRAWER_INTERFACE = new InjectionToken<DrawerServiceInterface>('Drawer Interface');

export const CONFIG_PROVIDER = new InjectionToken<ConfigInterface>('Config number for configuration', {
  factory: () => {
    return {
      textColor: 'blue'
    }
  }
})

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{provide: INIT_CONF, useValue: 1}, {provide: DrawerServiceBase, useExisting: DrawerService}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
