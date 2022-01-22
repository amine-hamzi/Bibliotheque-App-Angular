import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from "./clients/clients.component";
import {LivresComponent} from "./livres/livres.component";
import {PostClientComponent} from "./post-client/post-client.component";
import {PostLivreComponent} from "./post-livre/post-livre.component";
import {PutLivreComponent} from "./put-livre/put-livre.component";
import {PretsComponent} from "./prets/prets.component";
import {PutClientComponent} from "./put-client/put-client.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {CategoriesComponent} from "./categories/categories.component";
import {ReservationsComponent} from "./reservations/reservations.component";

const routes: Routes = [
  {path: 'clients', canActivate: [AuthGuardService],component: ClientsComponent},
  {path: 'categories', canActivate: [AuthGuardService],component: CategoriesComponent},
  {path: 'livres',  canActivate: [AuthGuardService],component: LivresComponent},
  {path: 'prets',  canActivate: [AuthGuardService],component: PretsComponent},
  {path: 'reservations',  canActivate: [AuthGuardService],component: ReservationsComponent},
  {path: 'home',  component: HomeComponent},
  {path: 'login',  component: LoginComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**',  redirectTo: 'home'}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
