import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGardService } from './service/auth-gard.service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { StoreComponent } from './store/store.component';

const routes: Routes = [
  { path: '', component: AdminComponent,canActivate:[AuthGardService] },
  { path: 'addadmin', component: AddAdminComponent,canActivate:[AuthGardService]},
  { path: 'login', component: LoginComponent },
  { path: 'store' , component:StoreComponent},
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }