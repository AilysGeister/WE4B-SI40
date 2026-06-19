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
import {ChooseSeatsComponent} from "./reservation/choose-seats/choose-seats.component";
import {BasketComponent} from "./basket/basket.component";
import {LastReportsComponent} from "./admin-pages/reports/last-reports/last-reports.component";
import {ReportComponent} from "./admin-pages/reports/report/report.component";
import {DashboardComponent} from "./admin-pages/dashboard/dashboard.component";
import {ReportsListComponent} from "./admin-pages/reports/reports-list/reports-list.component";
import {CommentsComponent} from "./admin-pages/comments/comments.component";
import {PersonalityComponent} from "./personality/personality.component";
import {PinedFilmsComponent} from "./admin-pages/films/pined-films/pined-films.component";
import {ProfileComponent} from "./auth/profile/profile.component";
import {EditProfileComponent} from "./auth/edit-profile/edit-profile.component";
import {EditProfileGuard} from "./auth/edit-profile/edit-profile.guard";
import {UsersListComponent} from "./admin-pages/users/users-list/users-list.component";
import {UserFormComponent} from "./admin-pages/users/user-form/user-form.component";
import {PersonalitiesListComponent} from "./admin-pages/personalities/personalities-list/personalities-list.component";
import {PersonalityFormComponent} from "./admin-pages/personalities/personality-form/personality-form.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'profile/:id/edit', component: EditProfileComponent, canActivate: [EditProfileGuard]},
  {path: 'film', component: FilmListComponent},
  {path: 'film/:slug', component: FilmComponent},
  {path: 'personality/:id', component: PersonalityComponent},
  {path: 'tools', component: AdminPagesComponent, canActivate: [AdminGuard], canActivateChild: [AdminGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_FUND_MANAGER', 'ROLE_MODERATOR'] },
    children: [
      {path: '', component: DashboardComponent, data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_FUND_MANAGER', 'ROLE_MODERATOR']}},
      {path: 'reports', component: ReportsListComponent, data: { expectedRoles: ['ROLE_ADMIN', 'Role_MODERATOR']}},
      {path: 'reports/active', component: LastReportsComponent, data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MODERATOR']}},
      {path: 'report/:id', component: ReportComponent, data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_MODERATOR']}},
      {path: 'comments', component: CommentsComponent, data: { expectedRoles: ['ROLE_ADMIN', 'Role_MODERATOR']}},
      {path: 'pined-films', component: PinedFilmsComponent, data: {expectedRoles: ['ROLE_ADMIN', 'ROLE_FUND_MANAGER']}},
      {path: 'users', component: UsersListComponent, data: {expectedRoles: ['ROLE_ADMIN']}},
      {path: 'users/edit/:id', component: UserFormComponent, data: {expectedRoles: ['ROLE_ADMIN']}},
      {path: 'users/new', component: UserFormComponent, data: {expectedRoles: ['ROLE_ADMIN']}},
      {path: 'personalities', component: PersonalitiesListComponent, data: {expectedRoles: ['ROLE_ADMIN']}},
      {path: 'personality/new', component: PersonalityFormComponent, data: {expectedRoles: ['ROLE_ADMIN']}},
      {path: 'personality/edit/:id', component: PersonalityFormComponent, data: {expectedRoles: ['ROLE_ADMIN']}},
    ]
  },
  {path: 'search/:query', component: SearchComponent},
  {path: 'reservation/choose-seats/:programmeId', component: ChooseSeatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
