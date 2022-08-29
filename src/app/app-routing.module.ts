import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceComponent } from './espace/espace.component';
import { UserComponent } from './user/user.component';
import { EspaceDetailComponent } from './espace-detail/espace-detail.component';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { RoleComponent } from './role/role.component';
import { TacheComponent } from './tache/tache.component';
import { TacheDetailComponent } from './tache-detail/tache-detail.component';
import { EvenementComponent } from './evenement/evenement.component';
import { EvenementDetailComponent } from './evenement-detail/evenement-detail.component';
import { SondageComponent } from './sondage/sondage.component';
import { SondageDetailComponent } from './sondage-detail/sondage-detail.component';
import { PropositionComponent } from './proposition/proposition.component';
import { ProfilComponent } from './profil/profil.component';
import { LoginComponent } from './login/login.component';
import {DetailEspaceComponent } from './detail-espace/detail-espace.component';
import {DetailUserComponent } from './detail-user/detail-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';



const routes: Routes = [
 

  { path: 'espaces', component: EspaceComponent, },
  { path: 'espace/detail', component: EspaceDetailComponent },
  { path: 'espace/detail/:id', component: EspaceDetailComponent },
  { path: 'espace/show/:id', component: DetailEspaceComponent },

  { path: 'users', component: UserComponent, },
  { path: 'user/detail', component: UserDetailComponent },
  { path: 'user/detail/:id', component: UserDetailComponent },
  { path: 'user/show/:id', component: DetailUserComponent },

  { path: 'role', component: RoleComponent },

  { path: 'taches', component: TacheComponent, },
  { path: 'tache/detail', component: TacheDetailComponent },
  { path: 'tache/detail/:id', component: TacheDetailComponent },

  { path: 'evenements', component: EvenementComponent, },
  { path: 'evenement/detail', component: EvenementDetailComponent },
  { path: 'evenement/detail/:id', component: EvenementDetailComponent },

  { path: 'sondages', component: SondageComponent, },
  { path: 'sondage/detail', component: SondageDetailComponent },
  { path: 'sondage/detail/:id', component: SondageDetailComponent },

  { path: 'propositions', component: PropositionComponent, },

  { path: 'profil', component: ProfilComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full'},


  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent, },

  { path: 'dashboardadmin', component: DashboardadminComponent, },






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
