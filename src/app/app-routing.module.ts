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

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  {path: 'film', component: FilmListComponent},
  {path: 'film/:slug', component: FilmComponent},
  {path: 'tools', component: AdminPagesComponent, canActivate: [AdminGuard], data: { expectedRoles: ['ROLE_ADMIN', 'ROLE_FUND_MANAGER', 'ROLE_MODERATOR']}, children: [

    ]},
  {path: 'search/:query', component: SearchComponent},
  {path: 'reservation/choose-seats/:programmeId', component: ChooseSeatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
