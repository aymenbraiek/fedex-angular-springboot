import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { HelloComponent } from './components/hello/hello.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AlreadyAuthService } from './services/already-auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AlreadyAuthService] },
  { path: 'hello', component: HelloComponent },
  { path: 'login', component: LoginComponent, canActivate: [AlreadyAuthService] },
  { path: 'register', component: RegisterComponent, canActivate: [AlreadyAuthService] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard/:fullName', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AlreadyAuthService]
})
export class AppRoutingModule { }
