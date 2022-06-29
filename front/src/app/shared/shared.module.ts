import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from "./modules/material/material.module";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {MainRoutingModule} from "../pages/main/main-routing.module";
import {DrawerComponent} from './components/drawer/drawer.component';
import {HeaderComponent} from './components/header/header.component';
import {DrawerListComponent} from './components/drawer-list/drawer-list.component';
import {HttpClientModule} from "@angular/common/http";
import {CarouselComponent} from './components/carousel/carousel.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {ExampleCardComponent} from "./components/example-card/example-card.component";
import {CardDirective} from "./directives/card.directive";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule,
    HttpClientModule,
  ],
  declarations: [CardDirective,
    ErrorPageComponent,
    DrawerComponent,
    HeaderComponent,
    DrawerListComponent,
    CarouselComponent,
    ProductListComponent,
    ProductCardComponent,
    ExampleCardComponent
  ],
  exports: [
    CardDirective,
    CommonModule,
    FormsModule,
    MaterialModule,
    ErrorPageComponent,
    DrawerComponent,
    HeaderComponent,
    CarouselComponent,
    ProductListComponent,
    ExampleCardComponent
  ]
})
export class SharedModule {
}
