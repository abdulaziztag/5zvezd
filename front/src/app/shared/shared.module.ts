import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {ReviewComponent} from './components/review/review.component';
import {AlertComponent} from './components/alert/alert.component';
import {AddReviewDialogComponent} from './components/add-review-dialog/add-review-dialog.component';
import {CatalogProductCardComponent} from './components/catalog-product-card/catalog-product-card.component';
import {DeleteCommentDialogComponent} from './components/delete-comment-dialog/delete-comment-dialog.component';
import {authInterceptorProviders} from "./helpers/auth.interceptor";
import { UserSettingsDialogComponent } from './components/user-settings-dialog/user-settings-dialog.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        MainRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
  declarations: [
    ErrorPageComponent,
    DrawerComponent,
    HeaderComponent,
    DrawerListComponent,
    CarouselComponent,
    ProductListComponent,
    ProductCardComponent,
    ReviewComponent,
    AlertComponent,
    AddReviewDialogComponent,
    CatalogProductCardComponent,
    DeleteCommentDialogComponent,
    UserSettingsDialogComponent,
    AccountMenuComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ErrorPageComponent,
    DrawerComponent,
    HeaderComponent,
    CarouselComponent,
    ProductListComponent,
    ReviewComponent,
    AlertComponent,
    CatalogProductCardComponent
  ],
  providers: [
    authInterceptorProviders
  ]
})
export class SharedModule {
}
