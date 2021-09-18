import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { HomeComponent } from './home/home.component';
import { ProduitComponent } from './home/produit/produit.component';
import { ProfileComponent } from './profile/profile.component';
import { FilteringComponent } from './home/filtering/filtering.component';
import { CommandeComponent } from './commande/commande.component'; 
import{DeliveryComponent} from './delivery/delivery.component';
import { Err404Component } from './err404/err404.component';


const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: '', component: HomeComponent },
  { path: 'produit/:id', component: ProduitComponent },
  { path: 'profile/:id', component: ProfileComponent,canActivate:[AuthGuardGuard] },
  { path: 'filter/:category', component:FilteringComponent},
  { path: 'commande', component: CommandeComponent,canActivate:[AuthGuardGuard] },
  { path:'delivery/:idOrder',component:DeliveryComponent,canActivate:[AuthGuardGuard]},
  { path: '**', component:Err404Component},
];
//,canActivate:[AuthGuardGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
