import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { EspaceComponent } from './espace/espace.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EspaceDetailComponent } from './espace-detail/espace-detail.component';

import {authInterceptorProviders } from './_helpers/auth.interceptor';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TacheComponent } from './tache/tache.component';
import { TacheDetailComponent } from './tache-detail/tache-detail.component';
import { EvenementComponent } from './evenement/evenement.component';
import { EvenementDetailComponent } from './evenement-detail/evenement-detail.component';
import { SondageComponent } from './sondage/sondage.component';
import { SondageDetailComponent } from './sondage-detail/sondage-detail.component';
import { PropositionDetailComponent } from './proposition-detail/proposition-detail.component';
import { PropositionComponent } from './proposition/proposition.component';
import { NgChartsModule } from 'ng2-charts';
import { BarchartComponent } from './barchart/barchart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { PieChartSondageComponent } from './pie-chart-sondage/pie-chart-sondage.component';
import { PieChartTacheComponent } from './pie-chart-tache/pie-chart-tache.component';
import { ProfilComponent } from './profil/profil.component';
import { LoginComponent } from './login/login.component';
import { DetailEspaceComponent } from './detail-espace/detail-espace.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';
import { ErreurComponent } from './erreur/erreur.component';

import { UserListComponent } from './user-list/user-list.component';
import { EspaceListComponent } from './espace-list/espace-list.component';
import { PropositionListComponent } from './proposition-list/proposition-list.component';



@NgModule({
  declarations: [
    AppComponent,
    EspaceComponent,
    UserComponent,
    RoleComponent,
    EspaceDetailComponent,
   
    UserDetailComponent,
    TacheComponent,
    TacheDetailComponent,
    EvenementComponent,
    EvenementDetailComponent,
    SondageComponent,
    SondageDetailComponent,
    PropositionDetailComponent,
    PropositionComponent,
    BarchartComponent,
    PieChartComponent,
    PieChartSondageComponent,
    PieChartTacheComponent,
    ProfilComponent,
    LoginComponent,
    DetailEspaceComponent,
    DetailUserComponent,
    DashboardComponent,
    DashboardadminComponent,
    ErreurComponent,
 
    UserListComponent,
    EspaceListComponent,
    PropositionListComponent,

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule ,
    Ng2GoogleChartsModule,
   
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
