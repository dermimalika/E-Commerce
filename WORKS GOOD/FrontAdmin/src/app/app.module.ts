import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard2Service } from './service/auth-guard2.service';
import { AuthenticationService } from './service/authentication.service';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { MaterialModule } from './angular-material.module';
import { HeaderComponent } from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { StoreComponent } from './store/store.component';
import { StoreService } from './service/store.service';
import { CategorysComponent } from './admin/categorys/categorys.component';
import { ViewcategoryComponent } from './admin/categorys/viewcategory/viewcategory.component';
import { AddcategoryComponent } from './admin/categorys/addcategory/addcategory.component';
import { ProductsComponent } from './admin/products/products.component';
import { AddproductComponent } from './admin/products/addproduct/addproduct.component';
import { ViewproductComponent } from './admin/products/viewproduct/viewproduct.component';

@NgModule({
  declarations: [
    
    FooterComponent,
    HeaderComponent,
    AppComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
    AddAdminComponent,
    CategorysComponent,
    ViewcategoryComponent,
    AddcategoryComponent,
    ProductsComponent,
    AddproductComponent,
    ViewproductComponent,
    StoreComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true
    },
    StoreService,
    AuthGuard2Service,
    AuthenticationService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
