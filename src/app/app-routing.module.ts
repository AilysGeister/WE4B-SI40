import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {SearchComponent} from "./search/search.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {FilmComponent} from "./film/film/film.component";
import {FilmListComponent} from "./film/film-list/film-list.component";
import {AdminPagesComponent} from "./admin-pages/admin-pages.component";
import {AdminGuard} from "./admin-pages/admin.guard";
import {AuthGuard} from "./auth/auth.guard";
import {GuestGuard} from "./auth/guest.guard";
import {LastReportsComponent} from "./admin-pages/reports/last-reports/last-reports.component";
import {ReportComponent} from "./admin-pages/reports/report/report.component";
import {DashboardComponent} from "./admin-pages/dashboard/dashboard.component";
import {ReportsListComponent} from "./admin-pages/reports/reports-list/reports-list.component";
import {CommentsComponent} from "./admin-pages/comments/comments.component";
import {PersonalityComponent} from "./personality/personality.component";
import {PinedFilmsComponent} from "./admin-pages/films/pined-films/pined-films.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: 'film', component: FilmListComponent},
  {path: 'film/:slug', component: FilmComponent},
  {path: 'personality/:id', component: PersonalityComponent},
  {path: 'tools', component: AdminPagesComponent, canActivate: [AdminGuard], canActivateChild: [AdminGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_FUND_MANAGER', 'ROLE_MODERATOR'] },
    children: [
      { path: '', component: DashboardComponent, data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_FUND_MANAGER', 'ROLE_MODERATOR']}},
      {path: 'reports', component: ReportsListComponent, data: { expectedRoles: ['ROLE_ADMIN', 'Role_MODERATOR']}},
      { path: 'reports/active', component: LastReportsComponent, data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MODERATOR']}},
      { path: 'report/:id', component: ReportComponent, data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MODERATOR']}},
      {path: 'comments', component: CommentsComponent, data: { expectedRoles: ['ROLE_ADMIN', 'Role_MODERATOR']}},
      {path: 'pined-films', component: PinedFilmsComponent, data: {expectedRoles: ['ROLE_ADMIN', 'ROLE_FUND_MANAGER']}},
    ]
  },
  {path: 'search/:query', component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
