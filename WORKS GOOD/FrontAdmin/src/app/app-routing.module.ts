import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGardService } from './service/auth-gard.service';
import { AuthGuard2Service } from './service/auth-guard2.service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { StoreComponent } from './store/store.component';
import { CategorysComponent } from './admin/categorys/categorys.component';
import { ProductsComponent } from './admin/products/products.component';
import { RecycleComponent } from './recycle/recycle.component';
import { UpdProductComponent } from './admin/products/upd-product/upd-product.component';
import { OrderComponent } from './admin/order/order.component';
import { Err404Component} from './err404/err404.component';

const routes: Routes = [
  { path: '', component: AdminComponent,canActivate:[AuthGardService] },
  { path: 'addadmin', component: AddAdminComponent,canActivate:[AuthGardService,AuthGuard2Service]},
  { path: 'login', component: LoginComponent },
  { path: 'store' , component:StoreComponent,canActivate:[AuthGuard2Service,AuthGardService],},
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGardService] },
  { path: 'admin/categorys', component: CategorysComponent,canActivate:[AuthGardService] },
  { path: 'admin/products', component: ProductsComponent,canActivate:[AuthGardService] },
  { path: 'admin/orders', component: OrderComponent,canActivate:[AuthGardService] },
  { path: 'recycle', component: RecycleComponent,canActivate:[AuthGardService] },
  { path: 'updproduct/:id', component: UpdProductComponent,canActivate:[AuthGardService] },
  { path: '**', component: Err404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
