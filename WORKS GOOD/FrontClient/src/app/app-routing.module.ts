import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { ProduitComponent } from './home/produit/produit.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: '', component: HomeComponent,canActivate:[AuthGuardGuard] },
  { path: 'produit/:id', component: ProduitComponent,canActivate:[AuthGuardGuard] },
  { path: 'profile/:id', component: ProfileComponent,canActivate:[AuthGuardGuard] },
];
//,canActivate:[AuthGuardGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
