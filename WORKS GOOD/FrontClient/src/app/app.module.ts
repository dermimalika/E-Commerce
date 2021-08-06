import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './services/authentication.service';
import { HomeComponent } from './home/home.component';
import { ProduitComponent } from './home/produit/produit.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './services/profile.service';
import { ProduitService } from './services/produit.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    ProduitComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule,
  ],
  providers: [AuthenticationService,
    ProfileService,
    ProduitService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
